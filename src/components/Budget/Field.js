import './Field.css';

const Field = ({ data, tot }) => {
  //   const root = document.documentElement;
  //   root.style.setProperty(`--height-${data.label}`, `${data.height}px`);
  //   const style = { heigth: `${data.height}px` };
  //   console.log(style);

  return (
    <div
      className='container__stackElement'
      style={{ height: `${data.height >= 15 ? data.height : 15}px` }}
    >
      <div className='container__stackElement--label'>{data.label}</div>
      <div className='container__stackElementDetails'>
        <span className='container__stackElementDetails--percentage'>
          {((data.amount / tot) * 100).toFixed(0)}%
        </span>
        <span className='container__stackElementDetails--price'>
          €{data.amount}
        </span>
      </div>
    </div>
  );
};

export default Field;

// {
//     name: 'Home',
//     field: { label: 'Rent', amount: 600 },
//   },
