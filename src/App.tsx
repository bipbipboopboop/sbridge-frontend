import React, { useEffect } from "react";
import Login from "./pages/Login";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log({ user, auth });
  }, [user]);

  return (
    <div className="App">
      <li>{`${loading}`}</li>
      <li>{JSON.stringify(user)}</li>
      <Login />
    </div>
  );
}

export default App;
