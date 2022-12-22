import React from "react";
import "./App-test.css";

import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/chatroom/1.ChatRoom";
import Logout from "./components/auth/Logout";
import Login from "./components/test/Login";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <Logout />
      </header>

      {user ? <ChatRoom /> : <Login />}
    </div>
  );
}

export default App;
