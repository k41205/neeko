import Container from './Container';
import './Budget.css';
import { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import Backdrop from '../UI/Backdrop';
import FirebaseContext from '../../contexts/firebase-context';

const Budget = () => {
  // STATES AND HOOKS
  const [containers, setContainers] = useState([]);
  const [modalView, setModalView] = useState(false);

  const ctx = useContext(FirebaseContext);
  useEffect(() => {
    ctx.getData().then((fetchedContainers) => setContainers(fetchedContainers));
  }, [ctx]);
  console.log(containers);

  // DATA VARS
  const totalExpense = containers
    .flatMap(({ fields }) => fields)
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current, 0);

  const sortedContainers = containers
    .map((container) => {
      const newContainer = { ...container };
      newContainer.totalAmount = newContainer.fields.reduce(
        (p, c) => p + c.amount,
        0
      );
      return newContainer;
    })
    .sort((a, b) => b.totalAmount - a.totalAmount);

  // JSX VARS
  const totalExpText = <h2>Total expenses: €{totalExpense}</h2>;

  const emptyText = (
    <h2>
      <span>No container found,</span>
      <span>start creating a new one!</span>
    </h2>
  );

  // HANDLERS
  const handleAddContainer = (type, name) => {
    ctx.postData('newContainer', name);
    setModalView(false);
  };

  const handleAddField = (data) => {
    ctx.postData('newField', data);
    setModalView(false);
  };

  const handleDeleteContainer = (dataRef) => {
    ctx.deleteData(dataRef);
  };

  const handleNewContainer = () => {
    setModalView(true);
  };

  const handleRenameContainer = () => {
    setModalView(true);
  };

  const handleEscForm = () => {
    setModalView(false);
  };

  return (
    <>
      <div className='budget'>
        {containers.length !== 0 &&
          sortedContainers.map((container) => (
            <Container
              key={container.id}
              data={container}
              onSubmitField={handleAddField}
              onDeleteContainer={handleDeleteContainer}
              onRenameContainer={handleRenameContainer}
            />
          ))}
        <button className='budget__button' onClick={handleNewContainer} />
        {modalView &&
          ReactDOM.createPortal(
            <Backdrop onClick={handleEscForm} />,
            document.getElementById('backdrop-root')
          )}
        {modalView &&
          ReactDOM.createPortal(
            <Form
              type='newContainer'
              onSubmit={handleAddContainer}
              onCancel={handleEscForm}
            />,
            document.getElementById('overlay-root')
          )}
      </div>
      <div className='budget__total'>
        {containers.length !== 0 ? totalExpText : emptyText}
      </div>
    </>
  );
};

export default Budget;
