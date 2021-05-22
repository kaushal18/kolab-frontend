import React from "react";
import { Redirect } from "react-router-dom";

const Constants = {
  tokenSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  tokenLength: 8,
};

function generateRandomToken(tokenLength: number) {
  let result = "";
  const characters = Constants.tokenSet;
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const GenerateToken = () => {
  const token: string = generateRandomToken(Constants.tokenLength);
  return <Redirect to={`/${token}`} />;
};

export default GenerateToken;
