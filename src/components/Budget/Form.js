import { useRef, useReducer } from 'react';
import './Form.css';
import Input from './Input';

const formReducer = (state, action) => {
  if (action.type === 'NAME_INPUT') {
    return {
      ...state,
      nameValue: action.val.trim(),
      nameValid: action.val.trim().length !== 0,
    };
  }
  if (action.type === 'FIELD_INPUT') {
    return {
      ...state,
      fieldValue: action.val.trim(),
      fieldValid: action.val.trim().length !== 0 && action.val !== '...',
    };
  }
  if (action.type === 'AMOUNT_INPUT') {
    return {
      ...state,
      amountValue: action.val,
      amountValid: action.val > 0,
    };
  }
  return {
    fieldValue: '',
    fieldValid: false,
    amountValue: '',
    amountValid: false,
    nameValue: '',
    nameValid: false,
    error: null,
  };
};

const Form = (props) => {
  const { type, onSubmit, onCancel, containerRef } = props;

  const uuid = crypto.randomUUID();
  const fieldRef = useRef();
  const amountRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();
  const nameContainerRef = useRef();

  const [formState, dispatchForm] = useReducer(formReducer, {
    fieldValue: '',
    fieldValid: null,
    amountValue: '',
    amountValid: null,
    nameValue: '',
    nameValid: null,
  });

  const onChangeFieldName = (value) => {
    dispatchForm({ type: 'FIELD_INPUT', val: value });
  };

  const onChangeAmount = (value) => {
    dispatchForm({ type: 'AMOUNT_INPUT', val: +value });
  };

  const onChangeContainerName = (value) => {
    dispatchForm({ type: 'NAME_INPUT', val: value });
  };

  const cancelFormHandler = () => {
    onCancel();
  };

  let inputs;
  let title;
  let valid;

  switch (type) {
    case 'newField': {
      valid = formState.fieldValid && formState.amountValid;
      title = 'Create a new field';
      inputs = [
        <Input
          key='fieldName'
          type='fieldName'
          ref={fieldRef}
          onChange={onChangeFieldName}
          valid={formState.fieldValid}
        />,
        <Input
          key='amount'
          type='amount'
          ref={amountRef}
          onChange={onChangeAmount}
          valid={formState.amountValid}
        />,
        <Input key='color' type='color' ref={colorRef} />,
        <Input key='description' type='description' ref={descriptionRef} />,
      ];
      break;
    }
    case 'newContainer': {
      valid = formState.nameValid;
      title = 'Create a new container';
      inputs = (
        <Input
          type='containerName'
          ref={nameContainerRef}
          onChange={onChangeContainerName}
          valid={formState.nameValid}
        />
      );
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    let data;
    if (type === 'newField') {
      data = {
        id: uuid,
        ref: containerRef, // it's needed to update the entire object with unionArray in Firestore
        label: fieldRef.current.value,
        amount: +amountRef.current.value,
        color: colorRef.current.value,
        description: descriptionRef.current.value,
      };
    }

    if (type === 'newContainer') {
      data = nameContainerRef.current.value;
    }
    console.log(data);
    // onSubmit(data);
  };
  return (
    <div className='form'>
      <h2 className='form__title'>{title}</h2>
      <form onSubmit={formHandler} className='form__chest'>
        {inputs}
        <div className='form__buttons'>
          <button
            type='submit'
            className='form__button form__button--yes'
            disabled={!valid}
          ></button>
          <button
            type='button'
            className='form__button form__button--no'
            onClick={cancelFormHandler}
          ></button>
        </div>
      </form>
    </div>
  );
};

export default Form;
