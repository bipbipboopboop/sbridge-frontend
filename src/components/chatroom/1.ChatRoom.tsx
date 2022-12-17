import React, { FormEvent, useRef, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./2.ChatMessage";

const ChatRoom = () => {
  const dummy = useRef<HTMLSpanElement>(null);
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(25)
  );

  const [messages] = useCollectionData(messagesQuery);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages?.reverse().map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
