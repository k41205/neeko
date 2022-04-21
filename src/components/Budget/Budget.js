import Container from './Container';
import './Budget.css';
import { useState } from 'react';
import NewContainer from './NewContainer';
import ReactDOM from 'react-dom';

const emptyText = (
  <p className='budget__text'>
    <span>No container found,</span>
    <span>start creating a new one!</span>
  </p>
);

const Budget = (props) => {
  // console.log(props.data);
  console.log('render budget');

  const totalExpense = props.data
    .flatMap(({ fields }) => fields)
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current, 0);

  const totalExpText = (
    <div className='budget__total'>
      <h2>Total expenses: €{totalExpense}</h2>
    </div>
  );

  const [modalView, setModalView] = useState(false);

  const newContainerHandler = () => {
    setModalView(true);
  };

  const addContainer = (name) => {
    props.onSave('container', name);
    setModalView(false);
  };

  // const addField = (data) => {
  //   props.onSave('field', data);
  //   setModalView(false);
  // };

  const cancelAddContainer = () => {
    setModalView(false);
  };

  const containers = props.data.map((container) => {
    const newContainer = { ...container };
    newContainer.totalAmount = newContainer.fields.reduce(
      (p, c) => p + c.amount,
      0
    );
    return newContainer;
  });
  containers.sort((a, b) => b.totalAmount - a.totalAmount);
  console.log(props.data);

  return (
    <>
      <div className='budget'>
        {props &&
          props?.data &&
          containers.map((container) => (
            <Container
              key={container.id}
              data={container}
              // onSubmitField={addField}
            />
          ))}
        <div className='budget__box'>
          <button className='budget__button' onClick={newContainerHandler} />
          {modalView &&
            ReactDOM.createPortal(
              <NewContainer
                onSubmit={addContainer}
                onCancel={cancelAddContainer}
              />,
              document.getElementById('overlay-root')
            )}
          {props.data.length === 0 && emptyText}
        </div>
      </div>
      {props.data.length !== 0 && totalExpText}
    </>
  );
};

export default Budget;
