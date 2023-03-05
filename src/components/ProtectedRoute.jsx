import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./Main";
import AuthContext from "../context/AuthProvider";

const verifyJwt = (auth) => {
  // check if access token is present and valid
  if(auth.accessToken) {
    return true;
  }
  else {
    return false;
  }
}

const verifyPassword = (token) => {
  // // return a promise
  // // make API call to check if token is password protected
  // fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/${token}`)
  // .then((response) => response.json())
  // .then(response => {
  //   console.log(response);
  //   // HTTP:200 -> not protected
  //   if(response.status === 200) {
  //     return false;
  //   }
  //    // HTTP:401 -> protected
  //   else if(response.status === 401) {
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
  const { auth, setAuth } = useContext(AuthContext);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [isJwtValid, setIsJwtValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(others => ({ ...others, token }));
    setLoading(true);
    // set state to fetching, show a spinner on screen
    // check if jwt is present and valid
    
    verifyJwt(auth)
      .then(response => {
        console.log("response from jwt", response);
        if(response) {
          setIsJwtValid(true);
          setLoading(false);
        }
        
        // if a valid jwt is present -> user is already logged in
        // else make a request to check if token is password protected
        if(!response) {
          verifyPassword(token)
            .then(response => {
              console.log("response from password", response);
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
