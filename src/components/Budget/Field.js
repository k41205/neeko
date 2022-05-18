import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import './Field.css';
import FirebaseContext from '../../contexts/firebase-context';

const Field = (props) => {
  const { data = {}, tot, isEditOn } = props;
  const { label, amount, color, description } = data;
  const percentage = ((amount / tot) * 100).toFixed(0);
  const height = (percentage / 100) * 20 * 15;

  const [modalView, setModalView] = useState(false);
  const [type, setType] = useState('');
  const ctx = useContext(FirebaseContext);

  const handleEditField = () => {
    setType('editField');
    setModalView(true);
  };

  const handleDeleteField = () => {
    ctx.postData('deleteField', data);
  };

  const handleEscForm = () => {
    setModalView(false);
  };
  return (
    <>
      <div
        className='field'
        style={{ height: `${height < 18 ? 18 : height}px` }}
      >
        <div className='field__label' style={{ backgroundColor: color }}>
          <p>{label}</p>
        </div>
        <div className='field__details'>
          <span className='field__details--percentage'>{percentage}%</span>
          <span className='field__details--price'>€{amount}</span>
        </div>
        <div
          className={
            isEditOn ? 'field__actions visible' : 'field__actions hidden'
          }
        >
          <button
            className='field__button field__button--edit'
            onClick={handleEditField}
          ></button>
          <button
            className='field__button field__button--delete'
            onClick={handleDeleteField}
          ></button>
        </div>
        {modalView &&
          ReactDOM.createPortal(
            <Form type={type} field={data} onCancel={handleEscForm} />,
            document.getElementById('overlay-root')
          )}
      </div>
      {}
    </>
  );
};

export default Field;
