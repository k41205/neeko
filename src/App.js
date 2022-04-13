import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Main from './components/UI/Main';
import Budget from './components/Budget/Budget';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { useEffect, useState, useCallback, useContext } from 'react';
import FirebaseContext from './contexts/firebase-context';

const firebaseConfig = {
  apiKey: 'AIzaSyC2hmOydTEpdmcpoOzzuVLng_j7u76djpo',
  authDomain: 'neeko-aa020.firebaseapp.com',
  projectId: 'neeko-aa020',
  storageBucket: 'neeko-aa020.appspot.com',
  messagingSenderId: '727544693791',
  appId: '1:727544693791:web:1fc671ecfca5671ea1012a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const postData = async (type, data) => {
  if (type === 'container') {
    try {
      const docRef = await addDoc(collection(db, 'containers'), {
        name: data,
        fields: [],
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  if (type === 'field') {
    console.log(data);
    try {
      const docRef = await updateDoc(data.ref, {
        fields: arrayUnion(data),
      });
      // console.log('Document updated with ID: ', data.id);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
};

function App() {
  const [containers, setContainers] = useState([]);
  const ctx = useContext(FirebaseContext);

  console.log(ctx.text);
  ctx.text = 'test';
  console.log(ctx.text);

  const getData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'containers'));
    // obj.docs[0]._document.data.value.mapValue.fields
    // console.log(querySnapshot);
    const containers = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.ref = doc.ref;
      data.id = doc.id;
      return data;
    });
    // console.log(containers);
    setContainers(containers);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Header />
      <button onClick={getData}></button>
      <Main>
        <Budget data={containers} onSave={postData} />
      </Main>
      <Footer />
    </>
  );
}

export default App;
