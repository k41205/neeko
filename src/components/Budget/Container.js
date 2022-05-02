import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Container.css';
import Field from './Field';
import Form from './Form';
import MergedFields from './MergedFields';
import Backdrop from '../UI/Backdrop';

const Container = (props) => {
  const { data, onSubmitField, onDeleteContainer } = props;
  const { fields = [], name } = data;

  // STATES
  const [mergedClass, setMergedClass] = useState('merged-hidden');
  const [modalView, setModalView] = useState(false);
  const [edit, setEdit] = useState(false);

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

  const mergedVisibilityHandler = () => {
    mergedClass === 'merged-hidden'
      ? setMergedClass('merged-visible')
      : setMergedClass('merged-hidden');
  };

  const newFieldHandler = () => {
    setModalView(true);
  };
  const submitFieldFormHandler = (data) => {
    onSubmitField(data);
    setModalView(false);
  };

  const escFormHandler = () => {
    setModalView(false);
  };

  const deleteContainerHandler = () => {
    onDeleteContainer(data.ref);
  };

  const editContainerHandler = () => {
    edit ? setEdit(false) : setEdit(true);
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
      onClick={mergedVisibilityHandler}
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
          onClick={editContainerHandler}
          className='container__button container__button--edit'
        ></button>
        <button className='container__button container__button--rename'></button>
        <button
          onClick={deleteContainerHandler}
          className='container__button container__button--remove'
        ></button>
      </div>
      <header className='container__header'>
        <h2 className='container__name'>{name}</h2>
      </header>
      <div className='container__stack'>
        <div onClick={newFieldHandler} className='container__button--add'>
          +
        </div>
        {fieldsMerged.length !== 0 && mergedFieldsElement}
        {fieldsMerged.length !== 0 && (
          <MergedFields data={fieldsMerged} fieldAction={edit} />
        )}
        {modalView &&
          ReactDOM.createPortal(
            <Backdrop onClick={escFormHandler} />,
            document.getElementById('backdrop-root')
          )}
        {modalView &&
          ReactDOM.createPortal(
            <Form
              type={'newField'}
              containerRef={data.ref}
              onSubmit={submitFieldFormHandler}
              onCancel={escFormHandler}
            />,
            document.getElementById('overlay-root')
          )}
        {fieldsShowed.length === 0 && emptyContainer}
        {fieldsShowed.map((field) => (
          <Field
            key={field.id}
            data={field}
            dataMerged={fieldsMerged}
            tot={totalAmount}
            fieldAction={edit}
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
