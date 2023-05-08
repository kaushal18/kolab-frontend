import React from "react";
import { Route, useParams, Redirect } from "react-router-dom";
import Main from "./Main";

/**
 * checks if a valid jwt is present in cookies 
 * if not then the URL token is checked if its password protected
 * if none of the above, then no auth is present for token
 */
const ProtectedRoute = ({ component, ...restOfProps}) => {
  const { token } = useParams();
	let isPasswordProtected = false;
	// let isJwtValid = true;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${process.env.REACT_APP_BACKEND_URL}/api/verify/${token}`, false); // false indicates a synchronous request
  xhr.send();

  console.log("status", xhr.status);

  if (xhr.status === 401) {
    isPasswordProtected = true;
  } 
  return (
    <Route 
        { ...restOfProps }
        render = {(props) => isPasswordProtected ? <Redirect to={`/login/${token}`}/> : <Main />}
    />
  );
};

export default ProtectedRoute;
