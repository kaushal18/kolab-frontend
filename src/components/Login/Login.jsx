import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

/**
 * This component takes password for the token and authenticates
 * upon sussesful auth it stores jwt for the specific token
 */

const Login = () => {
  const { token } = useParams();
  let history = useHistory();
  let isauthenticated = false;

  return <Redirect to={`/${token}`} />;
};

export default Login;
