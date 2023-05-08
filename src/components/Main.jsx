import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import useDebounce from "../hooks/useDebounce";
import ContentArea from "./ContentArea/ContentArea";
const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_URL;

const Main = () => {
  let { pathname : token } = useLocation();
  token = token.substring(1);
  const [localDocument, setLocalDocument] = useState("");
  const [socket, setSocket] = useState();
  const textareaRef = useRef(null);
  const debouncedDoc = useDebounce(localDocument, 500);

  // initiate a socket connection
  useEffect(() => {
    const socket = io(BACKEND_ENDPOINT, { query: { token: token } });
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
      setLocalDocument(message);
    });
  }, [socket]);

  // Emit the changes after debouncing
  useEffect(() => {
    socket?.emit("document", debouncedDoc);
  }, [debouncedDoc, socket]);

  // modify state as document changes
  const handleDocumentChange = (e) => {
    setLocalDocument(e.target.value);
  };

  const handleKeyDown = (e) => {  };

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
