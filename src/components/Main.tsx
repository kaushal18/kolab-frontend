import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import ContentArea from "./ContentArea/ContentArea";
const ENDPOINT = "http://localhost:5000";

// TODO - check if token is password protected
const Main = () => {
  const { token } = useParams<{ token: string }>();
  const [localDocument, setLocalDocument] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(ENDPOINT, { query: { token: token } });
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [token]);

  // listen for incomming messages
  useEffect(() => {
    socket?.on("message", (message) => {
      console.log("incomming", message);
      // TODO - resolve conflicts
      setLocalDocument(message);
    });
  }, [socket]);

  // emit current changes when localDocument modifies
  const handleDocumentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newLocalDocument = e.target.value;
    setLocalDocument(newLocalDocument);
    // TODO - debounce
    console.log("emit", newLocalDocument);
    socket?.emit("message", newLocalDocument);
  };

  return (
    <ContentArea
      document={localDocument}
      handleDocumentChange={handleDocumentChange}
    />
  );
};

export default Main;
