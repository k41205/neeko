import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

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

const FirebaseContext = React.createContext({
  postData: (type, data) => {},
  getData: () => {},
});

export const FirebaseContextProvider = (props) => {
  const [containers, setContainers] = useState([]);
  console.log('Context');

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
        await updateDoc(data.ref, {
          fields: arrayUnion(data),
        });
        console.log(`Document updated with ID: (it's a field) `);
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    }
  };

  const getData = async () => {
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
  };

  return (
    <FirebaseContext.Provider value={{ containers, getData, postData }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;