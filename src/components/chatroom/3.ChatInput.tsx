import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { auth, firestore } from "../../utils/firebase";

type ChatInputProps = {
  roomID: string;
};

const ChatInput = (props: ChatInputProps) => {
  const { roomID } = props;
  const [textInput, setTextInput] = useState("");
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }, []);

  const messagesRef = collection(firestore, `rooms/${roomID}/messages`);

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
    <form
      className="w-100 d-flex"
      style={{ height: "7vh" }}
      onSubmit={sendMessage}
    >
      <TextInput
        className="w-100"
        type="text"
        onChange={onChangeInput}
        value={textInput}
      />
      <SendButton type="submit" disabled={!textInput}>
        🕊️
      </SendButton>
    </form>
  );
};

export default ChatInput;

const TextInput = styled.input`
  width: 100%;
  background: rgb(58, 58, 58);
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
`;

const SendButton = styled.button`
  width: 10%;
  background-color: rgb(56, 56, 143);
`;
