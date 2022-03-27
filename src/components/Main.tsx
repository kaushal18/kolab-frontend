import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import ContentArea from "./ContentArea/ContentArea";
import useDebounce from "../hooks/useDebounce";
const BACKEND_ENDPOINT = "http://localhost:5000";

const Main = () => {
  const { token } = useParams<{ token: string }>();
  const [localDocument, setLocalDocument] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(BACKEND_ENDPOINT, { query: { token: token } });
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
    socket?.on("document", (message) => {
      console.log("incomming", message);
      // TODO - resolve conflicts
      setLocalDocument(message);
    });
  }, [socket]);

  const debounceAndEmit = useDebounce((newLocalDocument, socket) => {
    console.log(newLocalDocument);
    socket?.emit("document", newLocalDocument);
  }, 500);

  // emit current changes when localDocument modifies
  const handleDocumentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newLocalDocument = e.target.value;
    setLocalDocument(newLocalDocument);
    debounceAndEmit(newLocalDocument, socket);
  };

  return (
    <ContentArea
      document={localDocument}
      handleDocumentChange={handleDocumentChange}
    />
  );
};

export default Main;
