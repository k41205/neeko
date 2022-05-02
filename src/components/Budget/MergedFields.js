import './MergedFields.css';

const MergedFields = (props) => {
  const { data, isEditOn } = props;

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
            <button className='field__button field__button--edit'></button>
            <button className='field__button field__button--delete'></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MergedFields;
