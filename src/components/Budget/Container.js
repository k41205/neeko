import './Container.css';
import Field from './Field';

const Container = ({ data }) => {
  const totalAmount = data.fields.reduce((prev, curr) => prev + curr.amount, 0);
  const stackSorted = data.fields.sort(function (a, b) {
    return a.amount - b.amount;
  });
  const amounts = stackSorted.map((el) => el.amount);
  const heights = amounts.map(
    (el) => ((((el / totalAmount) * 100).toFixed(0) * 20) / 100) * 15
  );
  const perc = amounts
    .map((el) => (((el / totalAmount) * 100).toFixed(0) * 20) / 100)
    .sort((a, b) => b - a);
  console.log(perc);
  // let treshold = 20;
  // perc.foreach((e, i) => {
  //   if(treshold-e<=1) return i
  //   treshold -= e;
  // });
  const i = perc.findIndex((el) => el <= 1);
  console.log(i);
  const mergedFields = perc.splice(i);
  console.log(perc);

  console.log(mergedFields);

  // const i = perc.findIndex((el) => treshold - el < 42);
  // console.log(i);

  stackSorted.map((el, i) => {
    el.height = heights[i];
  });
  // console.log(stackSorted);

  return (
    <div className='container'>
      <header className='container__header'>
        <h2 className='container__name'>{data.name}</h2>
        <button className='container__button--remove'>X</button>
      </header>
      <div className='container__stack'>
        <div className='container__button--add'>+</div>
        {stackSorted.map((field) => (
          <Field key={Math.random()} data={field} tot={totalAmount} />
        ))}
        {/* <div className='container__stackElement' id='f1'>
          <div className='container__stackElement--label'>Other</div>
          <div className='container__stackElementDetails'>
            <span className='container__stackElementDetails--percentage'>
              6%
            </span>
            <span className='container__stackElementDetails--price'>€55</span>
          </div>
        </div>
        <div className='container__stackElement' id='f2'>
          <div className='container__stackElement--label'>Bills</div>
          <div className='container__stackElementDetails'>
            <span className='container__stackElementDetails--percentage'>
              9%
            </span>
            <span className='container__stackElementDetails--price'>€90</span>
          </div>
        </div>
        <div className='container__stackElement' id='f3'>
          <div className='container__stackElement--label'>Food</div>
          <div className='container__stackElementDetails'>
            <span className='container__stackElementDetails--percentage'>
              21%
            </span>
            <span className='container__stackElementDetails--price'>€200</span>
          </div>
        </div>
        <div className='container__stackElement' id='f4'>
          <div className='container__stackElement--label'>Rent</div>
          <div className='container__stackElementDetails'>
            <span className='container__stackElementDetails--percentage'>
              64%
            </span>
            <span className='container__stackElementDetails--price'>€600</span>
          </div>
        </div>*/}
      </div>
      <footer className='container__footer'>
        <h2>{totalAmount}€</h2>
      </footer>
    </div>
  );
};

export default Container;
