import { Redirect } from "react-router-dom";

function generateRandomToken(tokenLength: number) {
  let result = "";
  if (process.env.REACT_APP_PASTEBIN_TOKEN_CHAR_SET) {
    const characters = process.env.REACT_APP_PASTEBIN_TOKEN_CHAR_SET;
    const charactersLength = characters.length;
    for (let i = 0; i < tokenLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  return result;
}

const GenerateToken = () => {
  if (process.env.REACT_APP_PASTEBIN_TOKEN_LENGTH) {
    const token = generateRandomToken(
      parseInt(process.env.REACT_APP_PASTEBIN_TOKEN_LENGTH, 10)
    );
    return <Redirect to={`/login/${token}`} />;
  }
};

export default GenerateToken;
