import './MergedFields.css';

const MergedFields = (props) => {
  const { data } = props;

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
