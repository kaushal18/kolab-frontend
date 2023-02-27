import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./Main";

const verifyJwt = () => {
  // mock jwt retrieval
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

const verifyPassword = (token) => {
  // make API call to check if token is password protected
  // fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth?token=${token}`)
  // .then((response) => response.json())
  // .then(response => {
  //   if(response.status === 200) {
  //     return true;
  //   }
  //   else if(response.status === 500) {
  //     // redirect to fail page
  //   }
  //   else {
  //     return false;
  //   }
  // })
  // .catch(err => console.err(err));

  // mock api call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false);
    }, 4000);
  });
}

/**
 * checks if a valid jwt is present in cookies 
 * if not then the URL token is checked if its password protected
 * if none of the above, then no auth is present for token
 */
const ProtectedRoute = ({ component, ...restOfProps}) => {
  const [token, setToken] = useState(() => window.location.pathname.substring(1));
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [isJwtValid, setIsJwtValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // set state to fetching, show a spinner on screen
    // check if jwt is present and valid
    verifyJwt(token)
      .then(response => {
        console.log("respons from jwt", response);
        if(response) {
          setIsJwtValid(true);
          setLoading(false);
        }
        
        // if a valid jwt is present -> user is already logged in
        // else make a request to check if token is password protected
        if(!response) {
          verifyPassword(token)
            .then(response => {
              setIsPasswordProtected(response);
              setLoading(false);
            });
        }
      });
  }, [token])

  

  /*
  case 1:
    Jwt: valid --> redirect to <Main />
  case 2:
    Jwt: invalid, PasswordProtected: false --> redirect to <Main />
  case 3:
    Jwt: invalid, PasswordProtected: true --> redirect to /login
  */

  return (
    <>
      {
        loading && <h1>loading</h1>    
      }

      { !loading && 
        isJwtValid && 
        <Route { ...restOfProps } render = {(props) => <Main />} />
      }

      {
        !loading &&
        !isJwtValid &&
        !isPasswordProtected &&
        <Route { ...restOfProps } render = {(props) => <Main />} />
      }

      {
        !loading &&
        !isJwtValid &&
        isPasswordProtected &&
        <Route
          { ...restOfProps }
          render = {(props) => <Redirect to={`/login/${token}`}/>}
        />
      }
      
    </>
  );
};

export default ProtectedRoute;
