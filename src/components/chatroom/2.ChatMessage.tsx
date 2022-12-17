import React from "react";
import { DocumentData } from "firebase/firestore";
import { auth } from "../../utils/firebase";

type MessageProps = {
  message: DocumentData;
};

const ChatMessage = (props: MessageProps) => {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";
  // console.log({ msg: props.message });

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
