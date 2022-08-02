import React, { useContext } from "react";
import Loading from "../components/auth/Loading";

import { UserContext } from "../helpers/UserContext";

// Screens
import App from "./App";
import Auth from "./Auth";

const Router = () => {
  // Context
  const [User] = useContext(UserContext);

  return User.isLoggedIn === null ? (
    <Loading />
  ) : User.isLoggedIn ? (
    <App />
  ) : (
    <Auth />
  );
};

export default Router;
