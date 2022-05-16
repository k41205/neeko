import './MergedFields.css';
import FirebaseContext from '../../contexts/firebase-context';
import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

const MergedFields = (props) => {
  const { data, isEditOn } = props;

  const [modalView, setModalView] = useState(false);
  const [type, setType] = useState('');
  const [dataField, setDataField] = useState({});
  const ctx = useContext(FirebaseContext);

  const handleEditField = (field) => {
    setType('editField');
    setDataField(field);
    setModalView(true);
  };

  const handleDeleteField = (field) => {
    ctx.postData('deleteField', field);
  };

  const handleEscForm = () => {
    setModalView(false);
  };

  return (
    <div className='mergedFields'>
      {data.map((field) => (
        <div
          className='mergedFields__box'
          style={{ backgroundColor: field.color }}
          key={field.id}
        >
          <div className='mergedFields__label'>
            <p>{field.label}</p>
          </div>
          <div className='mergedFields__price'>€{field.amount}</div>
          <div
            className={
              isEditOn ? 'field__actions visible' : 'field__actions hidden'
            }
          >
            <button
              className='field__button field__button--edit'
              onClick={handleEditField.bind(null, field)}
            ></button>
            <button
              className='field__button field__button--delete'
              onClick={handleDeleteField.bind(null, field)}
            ></button>
          </div>
        </div>
      ))}
      {modalView &&
        ReactDOM.createPortal(
          <Form type={type} field={dataField} onCancel={handleEscForm} />,
          document.getElementById('overlay-root')
        )}
    </div>
  );
};

export default MergedFields;
