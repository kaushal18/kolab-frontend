import React, { useEffect, useState, useRef, useContext } from "react";
import { io } from "socket.io-client";
import ContentArea from "./ContentArea/ContentArea";
import AuthContext from "../context/AuthProvider";

const Main = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const token = auth.token;
  const [localDocument, setLocalDocument] = useState("");
  const [socket, setSocket] = useState();
  const textareaRef = useRef(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL, { query: { token } });
    socket.on("connect", () => {
      console.log("Connected to Socket", socket.id);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [token]);

  // listen for incomming messages
  useEffect(() => {
    socket?.on("document", (message) => {
      console.log("incomming data -", message);
      // TODO - resolve conflicts
      setLocalDocument(message);
    });
  }, [socket]);

  // emit current changes when localDocument modifies
  // TODO - capture the characters and add it in pending queue
  const handleDocumentChange = (e) => {
    const newLocalDocument = e.target.value;
    setLocalDocument(newLocalDocument);

    // TODO - check if operation is insert / delete
    // console.log(e);

    // if acknowledge has been recevied for last request then emit the request
    // else add in pending queue
    // if(ackReceived) {
      // TODO - pass the operation json in request
      socket?.emit("document", newLocalDocument);
    //   setAckReceived(false);
    // }
  };

  const handleKeyDown = (e) => {
    // console.log(e);
    // console.log(textareaRef);    
    if(e.key === 'Backspace' || e.key === 'Delete') {
      // console.log("delete operation");
    }
  };

  return (
    <ContentArea
      textareaRef={textareaRef}
      document={localDocument}
      handleDocumentChange={handleDocumentChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default Main;
