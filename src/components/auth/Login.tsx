import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { PacmanLoader } from "react-spinners";

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
