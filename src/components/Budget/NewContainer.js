import './NewContainer.css';
import ReactDOM from 'react-dom';
import Backdrop from '../UI/Backdrop';
import { useRef } from 'react';

const NewContainer = (props) => {
  const nameContainerRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    props.onSubmit(nameContainerRef.current.value);
  };

  const cancelFormHandler = (e) => {
    nameContainerRef.current.value = '';
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
            <label className='newContainer__label' htmlFor='name'>
              Name:
            </label>
            <input
              className='newContainer__input'
              id='name'
              ref={nameContainerRef}
            ></input>
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

export default NewContainer;
