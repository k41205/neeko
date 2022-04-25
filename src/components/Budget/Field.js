import './Field.css';

const Field = (props) => {
  const { data = {}, tot, dataMerged = [] } = props;
  const { label, amount, color, description } = data;
  const percentage = ((amount / tot) * 100).toFixed(0);
  const height = (percentage / 100) * 20 * 15;

  return (
    <>
      <div
        className='container__stackElement'
        style={{ height: `${height < 18 ? 18 : height}px` }}
      >
        <div
          className='container__stackElement--label'
          style={{ backgroundColor: color }}
        >
          <p>{label}</p>
        </div>
        <div className='container__stackElementDetails'>
          <span className='container__stackElementDetails--percentage'>
            {percentage}%
          </span>
          <span className='container__stackElementDetails--price'>
            €{amount}
          </span>
        </div>
      </div>
      {}
    </>
  );
};

export default Field;
