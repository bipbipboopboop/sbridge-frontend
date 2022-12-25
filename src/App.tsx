import "./App.css";

import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/chatroom/1.ChatRoom";

import Login from "./pages/Login";
import TopNavbar from "./components/navbar/1.Navbar";
import Lobby from "./components/test/Lobby";

function App() {
  const [user] = useAuthState(auth);
  console.log({ user });

  return (
    <div className="App">
      <TopNavbar />

      {/* {user ? <ChatRoom /> : <Login />} */}
      {user ? <Lobby /> : <Login />}
    </div>
  );
}

export default App;
