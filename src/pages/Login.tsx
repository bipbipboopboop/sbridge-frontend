/**
 * Styling
 */
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";
import Loading from "../components/Loading";
import useLogin from "../hooks/useLogin";

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
  const {
    loading,
    handleSignIn,
    playerProps: { playerName, setPlayerName },
  } = useLogin();

  const LoginForm = (
    <>
      <h2>Enter your name</h2>
      <form className="d-flex flex-column" onSubmit={handleSignIn}>
        <input
          className="mt-3"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Button variant="primary" className="mt-3" type="submit">
          Enter Lobby
        </Button>
      </form>
    </>
  );

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
