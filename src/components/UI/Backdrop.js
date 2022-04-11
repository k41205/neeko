import './Backdrop.css';

const Backdrop = (props) => {
  return <div onClick={props.onClick} className='backdrop'></div>;
};

export default Backdrop;
