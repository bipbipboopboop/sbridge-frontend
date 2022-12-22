import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/chatroom/1.ChatRoom";
import Logout from "./components/auth/Logout";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <Logout />
      </header>
      <section>{user ? <ChatRoom /> : <Login />}</section>

      {/* <Test /> */}
    </div>
  );
}

export default App;
