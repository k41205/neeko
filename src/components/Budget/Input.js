import './Input.css';
import React, { useImperativeHandle, useRef } from 'react';

const Input = React.forwardRef((props, ref) => {
  const { type, isValid, defaultValue = '', onChange } = props;

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

  const handleInputChange = (e) => {
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
            className={`form__input ${isValid === false ? 'error' : ''}`}
            id='field'
            ref={inputRef}
            onChange={handleInputChange}
            defaultValue={defaultValue}
          ></input>
          {isValid === false ? (
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
            className={`form__input ${isValid === false ? 'error' : ''}`}
            id='amount'
            ref={inputRef}
            defaultValue={defaultValue}
            onChange={handleInputChange}
          ></input>
          {isValid === false ? (
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
            defaultValue={defaultValue || randomColor()}
            onChange={handleInputChange}
          ></input>
        </div>
      );
      break;
    case 'description':
      // debugger;
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='description'>
            Description:
          </label>
          <textarea
            defaultValue={defaultValue}
            className='form__input'
            id='description'
            ref={inputRef}
            onChange={handleInputChange}
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
            className={`form__input ${isValid === false ? 'error' : ''}`}
            id='name'
            ref={inputRef}
            onChange={handleInputChange}
          ></input>
          {isValid === false ? (
            <p className='error-text'>Name can't be empty</p>
          ) : null}
        </div>
      );
      break;
    case 'containerRename':
      fieldHtml = (
        <div className='form__drawer'>
          <label className='form__label' htmlFor='name'>
            Name:
          </label>
          <input
            className={`form__input ${isValid === false ? 'error' : ''}`}
            id='name'
            ref={inputRef}
            onChange={handleInputChange}
          ></input>
          {isValid === false ? (
            <p className='error-text'>Name can't be empty or the same</p>
          ) : null}
        </div>
      );
      break;
  }
  return fieldHtml;
});

export default Input;
