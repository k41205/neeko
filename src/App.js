import './App.css';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Main from './components/UI/Main';
import Budget from './components/Budget/Budget';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Budget />
      </Main>
      <Footer />
    </>
  );
}

export default App;
