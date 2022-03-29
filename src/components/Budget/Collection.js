import Container from './Container';
import AddIcon from './AddIcon';
import './Collection.css';

// TEMPORARY - Dataset example
let DUMMY_COLLECTION = [
  {
    name: 'Home',
    fields: [
      { label: 'Rent', amount: 100 },
      { label: 'Rent', amount: 100 },
      { label: 'Food', amount: 200 },
      { label: 'Food', amount: 200 },
      { label: 'Bills', amount: 100 },
      { label: 'Bills', amount: 100 },
      { label: 'Other', amount: 4000 },
    ],
  },
  {
    name: 'Home',
    fields: [
      { label: 'Rent', amount: 600 },
      { label: 'Food', amount: 200 },
      { label: 'Bills', amount: 90 },
      { label: 'Other', amount: 55 },
    ],
  },
  {
    name: 'Holiday',
    fields: [
      { label: 'Flights', amount: 4900 },
      { label: 'Restaurants', amount: 3400 },
      { label: 'Restaurants', amount: 2400 },
      { label: 'Restaurants', amount: 1400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Restaurants', amount: 400 },
      { label: 'Activities', amount: 500 },
      { label: 'Gifts', amount: 120 },
      { label: 'Other', amount: 70 },
    ],
  },
];

const totalExpenses = DUMMY_COLLECTION.flatMap(({ fields }) => fields)
  .map(({ amount }) => amount)
  .reduce((prev, current) => prev + current, 0);

// TEMPORARY - To simulate empty state
// DUMMY_COLLECTION = null;

const emptyText = (
  <p className='collection__text'>
    <span>No container found,</span>
    <span>start creating a new one!</span>
  </p>
);

const totalExp = (
  <div className='collection__total'>
    <h2>Total expenses: €{totalExpenses}</h2>
  </div>
);

const Collection = () => {
  return (
    <>
      <div className='collection'>
        {DUMMY_COLLECTION &&
          DUMMY_COLLECTION.map((container) => (
            <Container key={Math.random()} data={container} />
          ))}
        <div className='collection__box'>
          <AddIcon />
          {!DUMMY_COLLECTION && emptyText}
        </div>
      </div>
      {DUMMY_COLLECTION && totalExp}
    </>
  );
};

export default Collection;
