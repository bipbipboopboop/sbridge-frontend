import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInAnonymously } from "firebase/auth";

type Props = {};

const Login = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      setLoading(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <button className="sign-in" onClick={signIn}>
        Sign in Anonymously
      </button>
      <li>{`${loading}`}</li>
    </div>
  );
};

export default Login;
