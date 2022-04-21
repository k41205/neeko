import './NewField.css';
import Backdrop from '../UI/Backdrop';
import { useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../contexts/firebase-context';

const NewField = (props) => {
  console.log('render NewField');

  const ctx = useContext(FirebaseContext);
  const fieldRef = useRef();
  const amountRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      ref: props.containerRef,
      label: fieldRef.current.value,
      amount: +amountRef.current.value,
      color: colorRef.current.value,
      description: descriptionRef.current.value,
    };
    props.onSubmit(data);
    ctx.postData('field', data);
    ctx.getData();
  };
  const cancelFormHandler = () => {
    fieldRef.current.value = '';
    amountRef.current.value = '';
    colorRef.current.value = '#000000';
    descriptionRef.current.value = '';
    props.onCancel();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={cancelFormHandler} />,
        document.getElementById('backdrop-root')
      )}
      <div className='newContainer'>
        <h2 className='newContainer__title'>Create a new container</h2>
        <form onSubmit={formHandler} className='newContainer__form'>
          <div className='newContainer__field'>
            <label className='newContainer__label' htmlFor='field'>
              Field:
            </label>
            <input
              className='newContainer__input'
              id='field'
              ref={fieldRef}
            ></input>
          </div>
          <div className='newContainer__field'>
            <label className='newContainer__label' htmlFor='amount'>
              Amount:
            </label>
            <input
              className='newContainer__input'
              id='amount'
              ref={amountRef}
            ></input>
          </div>
          <div className='newContainer__field'>
            <label className='newContainer__label' htmlFor='color'>
              Color:
            </label>
            <input
              className='newContainer__input'
              id='color'
              ref={colorRef}
              type='color'
            ></input>
          </div>
          <div className='newContainer__field'>
            <label className='newContainer__label' htmlFor='description'>
              Description:
            </label>
            <textarea
              className='newContainer__input'
              id='description'
              ref={descriptionRef}
            ></textarea>
          </div>
          <div className='newContainer__buttons'>
            <button
              type='submit'
              className='newContainer__button newContainer__button--yes'
            ></button>
            <button
              type='button'
              className='newContainer__button newContainer__button--no'
              onClick={cancelFormHandler}
            ></button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewField;
