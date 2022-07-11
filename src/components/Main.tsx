import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import ContentArea from "./ContentArea/ContentArea";
import useDebounce from "../hooks/useDebounce";
import { RouteProps } from "react-router-dom";
const BACKEND_ENDPOINT = "http://localhost:5000";

interface Insert {
  position: number;
  value: string;
}

interface Delete {
  position: number;
  length: number;
}

interface Operation {
  name: Insert | Delete;
}

interface Props extends RouteProps {}

const Main : React.FC<Props> = (props) => {
  let { pathname : token } = useLocation();
  token = token.substring(1);
  const [localDocument, setLocalDocument] = useState<string>("");
  const [ackReceived, setAckReceived] = useState<Boolean>(true);
  const [pendingQueue, setPendingQueue] = useState<Operation[]>(null);
  const [sentChangeQueue, setSentChangeQueue] = useState<Operation[]>(null);
  const [socket, setSocket] = useState<Socket>();

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
      console.log("incomming", message);
      // TODO - resolve conflicts
      setLocalDocument(message);
    });
  }, [socket]);

  const syncQueues = (newLocalDocument) => {
    
  }

  // emit current changes when localDocument modifies
  // TODO - capture the characters and add it in pending queue
  const handleDocumentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newLocalDocument = e.target.value;
    setLocalDocument(newLocalDocument);

    // TODO - check if operation is insert / delete
    console.log('event ' + e);

    // if acknowledge has been recevied for last request then emit the request
    // else add in pending queue
    if(ackReceived) {
      // TODO - pass the operation json in request
      socket?.emit("document", newLocalDocument);
      setAckReceived(false);
    }
  };

  return (
    <ContentArea
      document={localDocument}
      handleDocumentChange={handleDocumentChange}
    />
  );
};

export default Main;
