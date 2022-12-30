import "./App.css";

import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Login from "./pages/Login";
import TopNavbar from "./components/navbar/1.Navbar";
import Lobby from "./pages/Lobby";
import { Routes, Route } from "react-router-dom";
import { User } from "firebase/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <TopNavbar />
      <Routes>
        <Route element={<Main {...{ user }} />} path="/" />
      </Routes>
    </div>
  );
}

type Props = { user: User | null | undefined };

const Main = (props: Props) => {
  return props.user ? <Lobby /> : <Login />;
};

export default App;
