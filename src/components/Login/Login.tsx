import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

/**
 * This component takes password for the token and authenticates
 * upon sussesful auth it stores jwt for the specific token
 */

interface Props {
  token: string;
}

const Login : React.FC<Props> = () => {
  const { token } = useParams<{ token: string }>();
  let history = useHistory();
  let isauthenticated : boolean = false;

  return <Redirect to={`/${token}`} />;
};

export default Login;
