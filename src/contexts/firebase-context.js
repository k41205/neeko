import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
  where,
  query,
  getDoc,
  FieldValue,
  arrayRemove,
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
  updateData: (dataRef) => {},
  deleteData: (dataRef) => {},
  updateField: (oldData, newData) => {},
});

export const FirebaseContextProvider = (props) => {
  console.log('Context');

  const [update, setUpdate] = useState(0);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'containers'));
    // obj.docs[0]._document.data.value.mapValue.fields
    // console.log(querySnapshot);
    const containers = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      data.ref = doc.ref;
      return data;
    });
    return containers;
  };

  const postData = async (type, data) => {
    if (type === 'newContainer') {
      try {
        const docRef = await addDoc(collection(db, 'containers'), {
          name: data,
          fields: [],
        });
        console.log('Document written with ID: ', docRef.id);
        setUpdate((prevState) => prevState + 1);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
    if (type === 'newField') {
      console.log(data);
      try {
        await updateDoc(data.ref, {
          fields: arrayUnion(data),
        });
        console.log(`Document updated with ID: (it's a field) `);
        setUpdate((prevState) => prevState + 1);
      } catch (e) {
        console.error('Error creating a new field: ', e);
      }
    }

    if (type === 'editField') {
      try {
        console.log(data.id);

        const containersRef = collection(db, 'containers');
        const q = query(
          containersRef,
          where('fields', 'array-contains', data.id)
        );
        console.log(q);

        // const querySnapshot = await getDoc(q);
        // console.log(querySnapshot);
        await updateDoc(data.ref, {
          fields: arrayRemove(data),
        });
        await updateDoc(data.ref, {
          fields: arrayUnion(data),
        });

        console.log(`Document updated with ID: (it's a field) `);
        setUpdate((prevState) => prevState + 1);
      } catch (e) {
        console.error('Error updating a field: ', e);
      }
    }

    if (type === 'deleteField') {
      console.log('wow');

      try {
        await updateDoc(data.ref, {
          fields: arrayRemove(data),
        });
        console.log(`Document deleted with ID: (it's a field) `);
        setUpdate((prevState) => prevState + 1);
      } catch (e) {
        console.error('Error deleting a field: ', e);
      }
    }
  };

  const updateField = async (oldData, newData) => {
    console.log(oldData);
    console.log(newData);

    try {
      await updateDoc(oldData.ref, {
        fields: arrayRemove(oldData),
      });
      await updateDoc(newData.ref, {
        fields: arrayUnion(newData),
      });

      console.log(`Document updated with ID: (it's a field) `);
      setUpdate((prevState) => prevState + 1);
    } catch (e) {
      console.error('Error updating a field: ', e);
    }
  };

  const updateData = async (dataRef, data) => {
    try {
      await updateDoc(dataRef, { name: data });
      console.log(`Document updated`);
      setUpdate((prevState) => prevState + 1);
    } catch (e) {
      console.error('Error updating a document: ', e);
    }
  };

  const deleteData = async (dataRef) => {
    try {
      await deleteDoc(dataRef);
      console.log(`Document deleted`);
      setUpdate((prevState) => prevState + 1);
    } catch (e) {
      console.error('Error deleting a document: ', e);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        getData,
        postData,
        updateData,
        deleteData,
        updateField,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
