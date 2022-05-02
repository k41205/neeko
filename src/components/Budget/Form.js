import { useRef, useReducer, useContext } from 'react';
import FirebaseContext from '../../contexts/firebase-context';
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
  const { type, onSubmit, onCancel, container = {} } = props;
  const { ref, name } = container;

  const ctx = useContext(FirebaseContext);

  const [formState, dispatchForm] = useReducer(formReducer, {
    fieldValue: '',
    fieldValid: null,
    amountValue: '',
    amountValid: null,
    nameValue: '',
    nameValid: null,
  });

  const uuid = crypto.randomUUID();
  const fieldRef = useRef();
  const amountRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();
  const nameContainerRef = useRef();

  const handleChangeFieldName = (value) => {
    dispatchForm({ type: 'FIELD_INPUT', val: value });
  };

  const handleChangeAmount = (value) => {
    dispatchForm({ type: 'AMOUNT_INPUT', val: +value });
  };

  const handleChangeContainerName = (value) => {
    dispatchForm({ type: 'NAME_INPUT', val: value });
  };

  const handleEscForm = () => {
    onCancel();
  };

  let inputs;
  let title;
  let isValid;

  switch (type) {
    case 'newField': {
      isValid = formState.fieldValid && formState.amountValid;
      title = 'Create a new field';
      inputs = [
        <Input
          key='fieldName'
          type='fieldName'
          ref={fieldRef}
          onChange={handleChangeFieldName}
          isValid={formState.fieldValid}
        />,
        <Input
          key='amount'
          type='amount'
          ref={amountRef}
          onChange={handleChangeAmount}
          isValid={formState.amountValid}
        />,
        <Input key='color' type='color' ref={colorRef} />,
        <Input key='description' type='description' ref={descriptionRef} />,
      ];
      break;
    }
    case 'newContainer': {
      isValid = formState.nameValid;
      title = 'Create a new container';
      inputs = (
        <Input
          type='containerName'
          ref={nameContainerRef}
          onChange={handleChangeContainerName}
          isValid={formState.nameValid}
        />
      );
      break;
    }
    case 'renameContainer': {
      isValid = formState.nameValid && formState.nameValue !== name;
      title = 'Rename container';
      inputs = (
        <Input
          type='containerRename'
          ref={nameContainerRef}
          onChange={handleChangeContainerName}
          isValid={isValid}
        />
      );
      break;
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    let data;
    if (type === 'newField') {
      data = {
        id: uuid,
        ref, // it's needed to update the entire object with unionArray in Firestore
        label: fieldRef.current.value,
        amount: +amountRef.current.value,
        color: colorRef.current.value,
        description: descriptionRef.current.value,
      };
    }

    if (type === 'newContainer' || type === 'renameContainer') {
      data = nameContainerRef.current.value;
    }
    console.log(data);
    ctx.updateData(ref, data);
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
            disabled={!isValid}
          ></button>
          <button
            type='button'
            className='form__button form__button--no'
            onClick={handleEscForm}
          ></button>
        </div>
      </form>
    </div>
  );
};

export default Form;
