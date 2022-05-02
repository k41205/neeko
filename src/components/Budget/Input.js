import './Input.css';
import React, { useImperativeHandle, useReducer, useRef } from 'react';

const Input = React.forwardRef((props, ref) => {
  const { type, check, valid, onChange } = props;

  useImperativeHandle(ref, () => {
    return {
      value: inputRef.current.value,
    };
  });

  const inputRef = useRef();

  const randomColor = () => {
    const maxVal = 0xffffff;
    const randomNumber = Math.floor(Math.random() * maxVal);
    const exanumber = randomNumber.toString(16);
    const color = `#${exanumber.padStart(6, 0)}`;
    return color;
  };

  let fieldHtml;

  const inputChangeHandler = (e) => {
    onChange(e.target.value);
  };

  switch (type) {
    case 'fieldName':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='field'>
            Field:
          </label>
          <input
            className={`form__input ${valid === false ? 'error' : ''}`}
            id='field'
            ref={inputRef}
            onChange={inputChangeHandler}
          ></input>
          {valid === false ? (
            <p className='error-text'>Field can't be empty or ...</p>
          ) : null}
        </div>
      );
      break;
    case 'amount':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='amount'>
            Amount:
          </label>
          <input
            className={`form__input ${valid === false ? 'error' : ''}`}
            id='amount'
            ref={inputRef}
            onChange={inputChangeHandler}
          ></input>
          {valid === false ? (
            <p className='error-text'>Amount must be a number greater than 0</p>
          ) : null}
        </div>
      );
      break;
    case 'color':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='color'>
            Color:
          </label>
          <input
            className='form__input'
            id='color'
            ref={inputRef}
            type='color'
            defaultValue={randomColor()}
          ></input>
        </div>
      );
      break;
    case 'description':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='description'>
            Description:
          </label>
          <textarea
            className='form__input'
            id='description'
            ref={inputRef}
          ></textarea>
        </div>
      );
      break;
    case 'containerName':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='name'>
            Name:
          </label>
          <input
            className={`form__input ${valid === false ? 'error' : ''}`}
            id='name'
            ref={inputRef}
            onChange={inputChangeHandler}
          ></input>
          {valid === false ? (
            <p className='error-text'>Name can't be empty</p>
          ) : null}
        </div>
      );
      break;
  }
  return fieldHtml;
});

export default Input;
