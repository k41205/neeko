import { useRef, useReducer, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../contexts/firebase-context';
import './Form.css';
import Input from './Input';
import Backdrop from '../UI/Backdrop';

const initialState = {
  fieldValue: '',
  fieldValid: null,
  amountValue: '',
  amountValid: null,
  nameValue: '',
  nameValid: null,
  colorValue: '',
  descriptionValue: '',
  changed: null,
};

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
  if (action.type === 'COLOR_INPUT') {
    return {
      ...state,
      colorValue: action.val,
    };
  }
  if (action.type === 'DESCRIPTION_INPUT') {
    return {
      ...state,
      descriptionValue: action.val,
    };
  }
  if (action.type === 'UPDATE_STATE') {
    return {
      fieldValue: action.val.value.label,
      fieldValid:
        action.val.value.label.trim().length !== 0 &&
        action.val.value.label !== '...',
      amountValue: action.val.value.amount,
      amountValid: action.val.value.amount > 0,
      colorValue: action.val.value.color,
      descriptionValue: action.val.value.description,
      changed:
        action.val.value.label !== action.val.fieldRef.current.value ||
        action.val.value.amount !== +action.val.amountRef.current.value,
    };
  }
  return initialState;
};

const Form = (props) => {
  const { type, onCancel, container = {}, field = {} } = props;
  const { ref, name, id } = container;

  useEffect(() => {
    if (Object.keys(field) !== 0 && type === 'editField') {
      updateStateForm(field);
    }
  }, []);

  const ctx = useContext(FirebaseContext);

  const [formState, dispatchForm] = useReducer(formReducer, initialState);

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

  const handleChangeColor = (value) => {
    dispatchForm({ type: 'COLOR_INPUT', val: value });
  };
  const handleChangeDescription = (value) => {
    dispatchForm({ type: 'DESCRIPTION_INPUT', val: value });
  };

  const updateStateForm = (value) => {
    dispatchForm({ type: 'UPDATE_STATE', val: { value, fieldRef, amountRef } });
  };

  const handleEscForm = () => {
    onCancel();
  };

  let inputs;
  let title;
  let isValid;

  // INPUTS ASSIGNMENT
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
        <Input
          key='color'
          type='color'
          ref={colorRef}
          onChange={handleChangeColor}
        />,
        <Input
          key='description'
          type='description'
          ref={descriptionRef}
          onChange={handleChangeDescription}
        />,
      ];
      break;
    }
    case 'editField': {
      isValid = formState.fieldValid && formState.amountValid;
      title = 'Edit field';
      inputs = [
        <Input
          key='fieldName'
          type='fieldName'
          ref={fieldRef}
          onChange={handleChangeFieldName}
          isValid={formState.fieldValid}
          defaultValue={field.label}
        />,
        <Input
          key='amount'
          type='amount'
          ref={amountRef}
          onChange={handleChangeAmount}
          isValid={formState.amountValid}
          defaultValue={field.amount}
        />,
        <Input
          key='color'
          type='color'
          defaultValue={field.color}
          ref={colorRef}
          onChange={handleChangeColor}
        />,
        <Input
          key='description'
          type='description'
          defaultValue={field.description}
          ref={descriptionRef}
          onChange={handleChangeDescription}
        />,
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
      ctx.postData(type, data);
    }
    if (type === 'editField') {
      data = {
        id: uuid,
        ref: field.ref, // it's needed to update the entire object with unionArray in Firestore
        label: fieldRef.current.value,
        amount: +amountRef.current.value,
        color: colorRef.current.value,
        description: descriptionRef.current.value,
      };
      ctx.updateField(field, data);
    }

    if (type === 'newContainer') {
      data = nameContainerRef.current.value;
      ctx.postData(type, data);
    }

    if (type === 'renameContainer') {
      data = nameContainerRef.current.value;
      ctx.updateData(ref, data);
    }
    onCancel();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onCancel} />,
        document.getElementById('backdrop-root')
      )}
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
    </>
  );
};

export default Form;
