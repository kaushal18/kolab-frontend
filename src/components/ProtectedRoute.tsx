import React from "react";
import { Route, useParams, RouteProps, Redirect } from "react-router-dom";
import Main from "./Main";

interface Props extends RouteProps {}

/**
 * checks if a valid jwt is present in cookies 
 * if not then the URL token is checked if its password protected
 * if none of the above, then no auth is present for token
 */
const ProtectedRoute : React.FC<Props> = ({ component, ...restOfProps}) => {
  const { token } = useParams<{ token: string }>();
	let isPasswordProtected : boolean = false;
	let isJwtValid : boolean = true;

  return (
    <Route 
        { ...restOfProps }
        render = {(props) => isPasswordProtected ? <Redirect to={`/login/${token}`}/> : <Main />}
    />
  );
};

export default ProtectedRoute;
