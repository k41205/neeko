import './MergedFields.css';

const MergedFields = ({ data }) => {
  console.log(data[0]);

  return (
    <div className='mergedFields'>
      {data.map((field) => (
        <div className='mergedFields__box' key={Math.random()}>
          <div
            className='mergedFields__label'
            style={{ backgroundColor: field.color }}
          >
            <p>{field.label}</p>
          </div>
          <div className='mergedFields__price'>€{field.amount}</div>
        </div>
      ))}
    </div>
  );
};

export default MergedFields;
