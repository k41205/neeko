import './App.css';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Main from './components/UI/Main';
import Budget from './components/Budget/Budget';
import { useEffect, useState, useCallback, useContext } from 'react';
import FirebaseContext from './contexts/firebase-context';

function App() {
  const ctx = useContext(FirebaseContext);

  console.log(ctx);

  return (
    <>
      <Header />
      <button onClick={ctx.getData}></button>
      <Main>
        <Budget data={ctx.containers} onSave={ctx.postData} />
      </Main>
      <Footer />
    </>
  );
}

export default App;
