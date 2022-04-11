import './Field.css';

const Field = ({
  data: { label, amount, color, description } = {},
  tot,
  merged = [],
}) => {
  let percentage = ((amount / tot) * 100).toFixed(0);

  if (!(merged.length === 0)) {
    label = '...';
    percentage = merged[0];
    amount = merged[1];
  }

  const height = (percentage / 100) * 20 * 15;

  return (
    <div className='container__stackElement' style={{ height: `${height}px` }}>
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
        <span className='container__stackElementDetails--price'>€{amount}</span>
      </div>
    </div>
  );
};

export default Field;
