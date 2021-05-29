import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentArea from "./ContentArea/ContentArea";
import { io, Socket } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

// TODO - check if token is password protected
const Main = () => {
  const { token } = useParams<{ token: string }>();
  const [document, setDocument] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(ENDPOINT, { query: { token: token } });
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("message", (message) => {
      setDocument(message);
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [token]);

  // BUG - onChange listner fires on page load, empty message is emitted to server
  useEffect(() => {
    socket?.emit("message", document);
  }, [socket, document]);

  return <ContentArea setDocument={setDocument} />;
};

export default Main;
