import React from "react";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const Logout = () => {
  const [deleteUser] = useDeleteUser(auth);

  const logOut = async () => {
    try {
      await deleteUser();
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
