import React from 'react';
const FirebaseContext = React.createContext({
  text: '',
});

export const FirebaseContextProvider = (props) => {
  const test = 'ciao';
  return (
    <FirebaseContext.Provider value={{ text: test }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
