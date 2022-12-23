import { DocumentData } from "firebase/firestore";
import styled from "styled-components";

import { auth } from "../../utils/firebase";

type MessageProps = {
  message: DocumentData;
};

const ChatMessage = (props: MessageProps) => {
  const { text, uid, playerName } = props.message;
  const fromCurrPlayer = uid === auth.currentUser?.uid;
  const displayName = fromCurrPlayer ? "You" : playerName;

  const msgProps: { playerName: string; text: string } = {
    playerName: displayName,
    text: text,
  };

  return (
    <>
      {fromCurrPlayer ? (
        <SentMessage msgProps={msgProps} />
      ) : (
        <ReceivedMessage msgProps={msgProps} />
      )}
    </>
  );
};

export default ChatMessage;

const SentP = styled.p`
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  text-align: center;

  color: white;
  background: #0b93f6;
  align-self: flex-end;
`;

const SentDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const ReceivedP = styled.p`
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  text-align: center;

  background: #e5e5ea;
  color: black;
`;

const ReceivedDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  display: f;
`;
const SentMessage = (props: {
  msgProps: { playerName: string; text: string };
}) => {
  return (
    <>
      <SentDiv>
        <div>
          <SentP>{props.msgProps.text}</SentP>
        </div>
      </SentDiv>
    </>
  );
};

const ReceivedMessage = (props: {
  msgProps: { playerName: string; text: string };
}) => {
  return (
    <ReceivedDiv>
      <div>
        <p className="d-flex p-0 m-0">{props.msgProps.playerName}</p>
        <ReceivedP>{props.msgProps.text}</ReceivedP>
      </div>
    </ReceivedDiv>
  );
};
