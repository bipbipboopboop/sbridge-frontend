import React, { useEffect, useRef } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./2.ChatMessage";
import ChatInput from "./3.ChatInput";

const ChatRoom = () => {
  const dummy = useRef<HTMLSpanElement>(document.createElement("span"));
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(25)
  );

  const [messages] = useCollectionData(messagesQuery);

  useEffect(() => {
    console.log("cursor moved");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main>
        <>{console.log({ messages })}</>
        {messages?.reverse().map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <span ref={dummy}></span>
      </main>

      <ChatInput />
    </>
  );
};

export default ChatRoom;
