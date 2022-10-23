import React, { useState, createContext } from "react";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  // State
  const [state, setState] = useState({
    name: "",
    email: "",
    uid: "",
    isLoggedIn: null,
    msal_access_token: "",
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
