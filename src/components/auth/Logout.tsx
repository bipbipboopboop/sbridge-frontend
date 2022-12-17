import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

type Props = {};

const Logout = (props: Props) => {
  const [signOut] = useSignOut(auth);
  const logOut = async () => {
    try {
      await signOut();
      console.log(`User logged out!`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <button className="sign-out" onClick={logOut}>
      Sign Out
    </button>
  );
};

export default Logout;
