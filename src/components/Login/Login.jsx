import React from "react";
import { useParams, Redirect } from "react-router-dom";


const Login = () => {
  // Fetch the token from URL
  const { token } = useParams();

  return <Redirect to={`/${token}`} />;
};

export default Login;
