import "./App.css";

import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/chatroom/1.ChatRoom";

import Login from "./pages/Login";
import TopNavbar from "./components/navbar/1.Navbar";
import Game from "./components/test/Test";
// import Login from "./components/test/Login";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <TopNavbar />

      {/* {user ? <ChatRoom /> : <Login />} */}
      {user ? <Game /> : <Login />}
    </div>
  );
}

export default App;
