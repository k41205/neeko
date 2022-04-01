import './Container.css';
import Field from './Field';

// The height of a container is sampled by 20 steps, each step is equal to 5%. That grants a way to normalize the height of each field. In addition, to avoid a wierd behavior due to contain a large number of small fields, every field with percentage equal to 5% (1 step) or lesser will be merged in one field with predefined height that will show all the contained fields inside.
const Container = ({ data: { fields }, data: { name } }) => {
  const totalAmount = fields.reduce((prev, curr) => prev + curr.amount, 0);
  const fieldsSorted = fields.sort((a, b) => a.amount - b.amount); // ascending order
  const index = fieldsSorted
    .map(
      (field) => (((field.amount / totalAmount) * 100).toFixed(0) * 20) / 100
    )
    .findIndex((el) => el > 1);
  let fieldsShowed = fieldsSorted.slice(index);
  let fieldsMerged = [];
  let mergedProps = [];

  if (index >= 0) {
    fieldsMerged = fieldsSorted.slice(0, index);
    const fieldsMergedTot = fieldsMerged.reduce(
      (prev, curr) => prev + curr.amount,
      0
    );
    const fieldsMergedPerc = ((fieldsMergedTot / totalAmount) * 100).toFixed(0);
    mergedProps = [fieldsMergedPerc, fieldsMergedTot];
  } else fieldsShowed = fieldsSorted;

  return (
    <div className='container'>
      <header className='container__header'>
        <h2 className='container__name'>{name}</h2>
        <button className='container__button--remove'>X</button>
      </header>
      <div className='container__stack'>
        <div className='container__button--add'>+</div>
        {fieldsMerged.length === 0 ? null : (
          <Field key={Math.random()} merged={mergedProps} tot={totalAmount} />
        )}
        {fieldsShowed.map((field) => (
          <Field key={Math.random()} data={field} tot={totalAmount} />
        ))}
      </div>
      <footer className='container__footer'>
        <h2>{totalAmount}€</h2>
      </footer>
    </div>
  );
};

export default Container;
