import React from "react";
import { auth } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

type Props = {};

const Login = (props: Props) => {
  const [signOut] = useSignOut(auth);
  const signIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut();
      console.log(`User logged out!`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <button style={{ marginTop: "200px" }} onClick={signIn}>
        Sign In Anonymously
      </button>
      <button style={{ marginTop: "200px" }} onClick={logOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Login;
