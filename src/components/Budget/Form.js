import './Form.css';
import { useRef, useReducer } from 'react';

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
  if (action.type === 'INPUT_BLUR') {
    return {
      ...state,
      nameValid: state.nameValue.length !== 0,
      fieldValid: state.fieldValue.length !== 0 && state.fieldValue !== '...',
      amountValid: state.amountValue > 0,
    };
  }

  return {
    fieldValue: '',
    fieldValid: false,
    amountValue: '',
    amountValid: false,
    nameValue: '',
    nameValid: false,
  };
};

const Form = (props) => {
  const { type, containerRef } = props;

  const [formState, dispatchForm] = useReducer(formReducer, {
    fieldValue: '',
    fieldValid: null,
    amountValue: '',
    amountValid: null,
    nameValue: '',
    nameValid: null,
  });

  const fieldRef = useRef();
  const amountRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();
  const nameContainerRef = useRef();
  const uuid = crypto.randomUUID();

  const randomColor = () => {
    const maxVal = 0xffffff;
    const randomNumber = Math.floor(Math.random() * maxVal);
    const exanumber = randomNumber.toString(16);
    const color = `#${exanumber.padStart(6, 0)}`;
    return color;
  };

  const errorCl = 'error';

  // FIELD FORM
  if (type === 'field') {
    const title = 'Create a new field';

    const formHandler = (e) => {
      e.preventDefault();
      if (!formState.fieldValid || !formState.amountValid) {
        return;
      }

      const data = {
        id: uuid,
        ref: containerRef, // it's needed to update the entire object with unionArray in Firestore
        label: fieldRef.current.value,
        amount: +amountRef.current.value,
        color: colorRef.current.value,
        description: descriptionRef.current.value,
      };
      props.onSubmit(data);
    };
    const cancelFormHandler = () => {
      fieldRef.current.value = '';
      amountRef.current.value = '';
      colorRef.current.value = '#000000';
      descriptionRef.current.value = '';
      props.onCancel();
    };

    const fieldChangeHandler = (e) => {
      dispatchForm({ type: 'FIELD_INPUT', val: e.target.value });
    };

    const amountChangeHandler = (e) => {
      dispatchForm({ type: 'AMOUNT_INPUT', val: +e.target.value });
    };

    return (
      <div className='form'>
        <h2 className='form__title'>{title}</h2>
        <form onSubmit={formHandler} className='form__chest'>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='field'>
              Field:
            </label>
            <input
              className={`form__input ${
                formState.fieldValid === false ? errorCl : ''
              }`}
              id='field'
              ref={fieldRef}
              onChange={fieldChangeHandler}
            ></input>
            {formState.fieldValid === false ? (
              <p className='error-text'>Field can't be empty or ...</p>
            ) : null}
          </div>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='amount'>
              Amount:
            </label>
            <input
              className={`form__input ${
                formState.amountValid === false ? errorCl : ''
              }`}
              id='amount'
              ref={amountRef}
              onChange={amountChangeHandler}
            ></input>
            {formState.amountValid === false ? (
              <p className='error-text'>
                Amount must be a number greater than 0
              </p>
            ) : null}
          </div>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='color'>
              Color:
            </label>
            <input
              className='form__input'
              id='color'
              ref={colorRef}
              type='color'
              defaultValue={randomColor()}
            ></input>
          </div>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='description'>
              Description:
            </label>
            <textarea
              className='form__input'
              id='description'
              ref={descriptionRef}
            ></textarea>
          </div>
          <div className='form__buttons'>
            <button
              type='submit'
              className='form__button form__button--yes'
              disabled={!formState.fieldValid || !formState.amountValid}
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
  }

  // CONTAINER FORM
  if (type === 'container') {
    const formHandler = (e) => {
      e.preventDefault();
      if (!formState.nameValid) {
        console.log('error');
        return;
      }
      //   props.onSubmit(nameContainerRef.current.value);
    };

    const cancelFormHandler = (e) => {
      //   nameContainerRef.current.value = '';
      props.onCancel();
    };

    const nameChangeHandler = (e) => {
      dispatchForm({ type: 'NAME_INPUT', val: e.target.value });
    };

    const validateNameHandler = () => {
      dispatchForm({ type: 'INPUT_BLUR' });
    };

    return (
      <div className='form'>
        <h2 className='form__title'>Create a new container</h2>
        <form onSubmit={formHandler} className='form__chest'>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='name'>
              Name:
            </label>
            <input
              className={`form__input ${
                formState.nameValid === false ? errorCl : ''
              }`}
              id='name'
              //   ref={nameContainerRef}
              value={formState.nameValue}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
            ></input>
            {formState.nameValid === false ? (
              <p className='error-text'>Name can't be empty</p>
            ) : null}
          </div>
          <div className='form__buttons'>
            <button
              type='submit'
              className='form__button form__button--yes'
              disabled={!formState.nameValid}
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
  }
};

export default Form;
