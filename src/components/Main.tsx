import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import ContentArea from "./ContentArea/ContentArea";
const ENDPOINT = "http://localhost:5000";

// todo - check if token is password protected
const Main = () => {
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const socket = io(ENDPOINT, { query: { token: token } });
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, [token]);

  return <ContentArea />;
};

export default Main;
