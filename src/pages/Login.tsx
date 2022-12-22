import { useState } from "react";

import { signInAnonymously } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addPlayer } from "../utils/playerFunctions";

/**
 * Styling
 */
import { Button, Card } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const Background = styled.div`
  background: rgb(129, 251, 184);
  background: linear-gradient(
    90deg,
    rgba(129, 251, 184, 1) 59%,
    rgba(40, 199, 111, 1) 100%
  );
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      addPlayer({ playerName });
      setLoading(false);
      // setTimeout(() => setLoading(false), 10000); // Testing
    } catch (err: any) {
      alert(err.message);
    }
  };

  const LoginForm = (
    <>
      <h2>Enter your name</h2>
      <input
        className="mt-3"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button variant="primary" className="mt-3" onClick={handleSignIn}>
        Enter Lobby
      </Button>
    </>
  );

  const Loading = () => {
    return (
      <>
        <h2>Loading</h2>
        <PacmanLoader color={"#98FB98"} />
      </>
    );
  };

  return (
    <Background>
      <Card style={{ height: "60%", minWidth: "35%", borderRadius: "1rem" }}>
        <Card.Body className="p-5 d-flex flex-column justify-content-center align-items-center">
          {loading ? <Loading /> : LoginForm}
        </Card.Body>
      </Card>
    </Background>
  );
};

export default Login;
