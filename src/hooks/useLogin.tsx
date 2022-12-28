import { useState } from "react";
import { auth, functions } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import usePlayer from "./usePlayer";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [addPlayer] = useHttpsCallable<string, null>(functions, "addPlayer");
  const { playerData } = usePlayer();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      await addPlayer(playerName);
      playerData && setLoading(false);
    } catch (err: any) {
      alert(err.message);
    }
  };
  return { loading, handleSignIn, playerProps: { playerName, setPlayerName } };
};

export default useLogin;
