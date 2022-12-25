import { signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { addCurrPlayer } from "../utils/playerFunctions";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      addCurrPlayer({ playerName });
      setLoading(false);
      // setTimeout(() => setLoading(false), 10000); // Testing
    } catch (err: any) {
      alert(err.message);
    }
  };
  return { loading, handleSignIn, playerProps: { playerName, setPlayerName } };
};

export default useLogin;
