import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { auth, firestore } from "../../utils/firebase";

const ChatInput = () => {
  const [textInput, setTextInput] = useState("");
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }, []);

  const messagesRef = collection(firestore, "messages");

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const playerName = auth.currentUser?.displayName;

    await addDoc(messagesRef, {
      text: textInput,
      createdAt: serverTimestamp(),
      uid,
      playerName,
    });

    setTextInput("");
  };

  return (
    <form onSubmit={sendMessage}>
      <input type="text" onChange={onChangeInput} value={textInput} />
      <button type="submit" disabled={!textInput}>
        🕊️
      </button>
    </form>
  );
};

export default ChatInput;
