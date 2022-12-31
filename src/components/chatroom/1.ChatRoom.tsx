import { useEffect, useRef } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./2.ChatMessage";
import ChatInput from "./3.ChatInput";
import styled from "styled-components";
type ChatRoomProps = {
  roomID: string;
};

const ChatRoom = (props: ChatRoomProps) => {
  const { roomID } = props;
  const dummy = useRef<HTMLSpanElement>(document.createElement("span"));
  const messagesRef = collection(firestore, `rooms/${roomID}/messages`);
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
    <div className="w-100 h-100 d-flex flex-column">
      <Background>
        <>{console.log({ messages })}</>
        {messages?.reverse().map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <span ref={dummy}></span>
      </Background>

      <ChatInput roomID={roomID} />
    </div>
  );
};

export default ChatRoom;

const Background = styled.div`
  height: 100vh;
  background: rgb(129, 251, 184);
  background: linear-gradient(
    90deg,
    rgba(129, 251, 184, 1) 59%,
    rgba(40, 199, 111, 1) 100%
  );
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
