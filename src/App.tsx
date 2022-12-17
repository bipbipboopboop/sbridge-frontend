import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/chatroom/1.ChatRoom";
import Logout from "./components/auth/Logout";

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log({ user, auth });
  }, [user]);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <Logout />
      </header>
      {/* <li>{JSON.stringify(user)}</li> */}
      <section>{user ? <ChatRoom /> : <Login />}</section>
    </div>
  );
}

export default App;
