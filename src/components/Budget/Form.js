import './Form.css';
import { useRef } from 'react';

const Form = (props) => {
  const { type, containerRef } = props;

  const fieldRef = useRef();
  const amountRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();
  const nameContainerRef = useRef();

  if (type === 'field') {
    const title = 'Create a new field';

    const formHandler = (e) => {
      e.preventDefault();
      const data = {
        ref: containerRef,
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

    return (
      <div className='form'>
        <h2 className='form__title'>{title}</h2>
        <form onSubmit={formHandler} className='form__chest'>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='field'>
              Field:
            </label>
            <input className='form__input' id='field' ref={fieldRef}></input>
          </div>
          <div className='form__drawer'>
            <label className='form__label' htmlFor='amount'>
              Amount:
            </label>
            <input className='form__input' id='amount' ref={amountRef}></input>
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

  if (type === 'container') {
    const formHandler = (e) => {
      e.preventDefault();
      props.onSubmit(nameContainerRef.current.value);
    };

    const cancelFormHandler = (e) => {
      nameContainerRef.current.value = '';
      props.onCancel();
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
              className='form__input'
              id='name'
              ref={nameContainerRef}
            ></input>
          </div>
          <div className='form__buttons'>
            <button
              type='submit'
              className='form__button form__button--yes'
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
