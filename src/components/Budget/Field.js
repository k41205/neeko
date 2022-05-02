import './Field.css';

const Field = (props) => {
  const { data = {}, tot, dataMerged = [], isEditOn } = props;
  const { label, amount, color, description } = data;
  const percentage = ((amount / tot) * 100).toFixed(0);
  const height = (percentage / 100) * 20 * 15;

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
          <button className='field__button field__button--edit'></button>
          <button className='field__button field__button--delete'></button>
        </div>
      </div>
      {}
    </>
  );
};

export default Field;
