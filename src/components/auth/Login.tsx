import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";

import { signInAnonymously } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { addPlayer } from "../../utils/playerFunctions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      addPlayer({ playerName: "Abner", roomID: "publicLobby" });
      setLoading(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      {!loading && (
        <button className="sign-in" onClick={signIn}>
          Sign in Anonymously
        </button>
      )}
      <div className="w-100 d-flex justify-content-center">
        {loading && <PacmanLoader color="yellow" />}
      </div>
    </>
  );
};

export default Login;
