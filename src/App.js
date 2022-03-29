import './App.css';
import Collection from './components/Budget/Collection';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Main from './components/UI/Main';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Collection />
      </Main>
      <Footer />
    </>
  );
}

export default App;
