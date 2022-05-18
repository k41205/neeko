import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Container.css';
import Field from './Field';
import Form from './Form';
import MergedFields from './MergedFields';

const Container = (props) => {
  const { data, onSubmitField, onDeleteContainer } = props;
  const { fields = [], name } = data;

  // STATES
  const [mergedClass, setMergedClass] = useState('merged-hidden');
  const [modalView, setModalView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState('');

  // DATA VARS
  const totalAmount = fields.reduce((prev, curr) => prev + curr.amount, 0);
  const fieldsSorted = fields.sort((a, b) => a.amount - b.amount); // ascending order
  const percentages = fieldsSorted.map(
    (field) => (((field.amount / totalAmount) * 100).toFixed(1) * 20) / 100
  );

  // The height of a container is sampled by 20 steps, each step is equal to 5%. That grants a way to normalize the height of each field. The app needs to allocate space to bigger fields and check how much space still remain, when is required more than what has remained, a new field that get that remaining space has to be created with all the merged fields.
  let counter = 20;
  let index = -1;
  for (let i = percentages.length - 1; i > 1; i--) {
    if (counter - percentages[i] < 1) {
      index = i + 1;
      break;
    }
    counter -= percentages[i];
  }

  let fieldsShowed = fieldsSorted.slice(index);
  let fieldsMerged = [];
  let fieldsMergedTot = 0;
  let fieldsMergedPerc = 0;

  if (index > 0) {
    fieldsMerged = fieldsSorted.slice(0, index);
    fieldsMergedTot = fieldsMerged.reduce(
      (prev, curr) => prev + curr.amount,
      0
    );

    fieldsMergedPerc = ((fieldsMergedTot / totalAmount) * 100).toFixed(0);
  } else fieldsShowed = fieldsSorted;

  // HANDLERS

  const handleShowMergedFields = () => {
    mergedClass === 'merged-hidden'
      ? setMergedClass('merged-visible')
      : setMergedClass('merged-hidden');
  };

  const handleNewField = () => {
    setType('newField');
    setModalView(true);
  };
  const handleAction = (type, data) => {
    onSubmitField(data);
    setModalView(false);
  };

  const handleEscForm = () => {
    setModalView(false);
  };

  const handleDeleteContainer = () => {
    onDeleteContainer(data.ref);
  };

  const handleEditContainer = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const handleRenameContainer = () => {
    setType('renameContainer');
    setModalView(true);
  };

  // JSX VAR
  const emptyContainer = (
    <div className='field' style={{ height: `300px` }}>
      <div className='field__label'>
        <p>
          <span>This container is empty.</span>
          <span>Add a field!</span>
        </p>
      </div>
    </div>
  );

  const mergedFieldsElement = (
    <div
      onClick={handleShowMergedFields}
      className={`field ${mergedClass}`}
      style={{ height: `18px` }}
    >
      <div className='field__label' style={{ backgroundColor: '#ffffff' }}>
        <p>...</p>
      </div>
      <div className='field__details'>
        <span className='field__details--percentage'>{fieldsMergedPerc}%</span>
        <span className='field__details--price'>€{fieldsMergedTot}</span>
      </div>
    </div>
  );

  return (
    <div className='container'>
      <div className='container__buttons'>
        <button
          onClick={handleEditContainer}
          className='container__button container__button--edit'
        ></button>
        <button
          className='container__button container__button--rename'
          onClick={handleRenameContainer}
        ></button>
        <button
          onClick={handleDeleteContainer}
          className='container__button container__button--remove'
        ></button>
      </div>
      <header className='container__header'>
        <h2 className='container__name'>{name}</h2>
      </header>
      <div className='container__stack'>
        <div onClick={handleNewField} className='container__button--add'>
          +
        </div>
        {fieldsMerged.length !== 0 && mergedFieldsElement}
        {fieldsMerged.length !== 0 && (
          <MergedFields data={fieldsMerged} isEditOn={edit} />
        )}
        {modalView &&
          ReactDOM.createPortal(
            <Form
              type={type}
              container={data}
              onSubmit={handleAction}
              onCancel={handleEscForm}
            />,
            document.getElementById('overlay-root')
          )}
        {fieldsShowed.length === 0 && emptyContainer}
        {fieldsShowed.map((field) => (
          <Field
            key={field.id}
            data={field}
            tot={totalAmount}
            isEditOn={edit}
          />
        ))}
      </div>
      <footer className='container__footer'>
        <h2>{totalAmount}€</h2>
      </footer>
    </div>
  );
};

export default Container;
