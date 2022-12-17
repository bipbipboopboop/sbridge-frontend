import React, { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { auth } from "../../utils/firebase";
import "./chat.css";

type MessageProps = {
  message: DocumentData;
};

const ChatMessage = (props: MessageProps) => {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";
  const [formValue, setFormValue] = useState("");
  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
