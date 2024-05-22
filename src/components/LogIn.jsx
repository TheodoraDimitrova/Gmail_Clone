import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/user";
//getAuth is a method of firebase auth which will return the auth object
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LogIn() {
  const dispatch = useDispatch();

  const signIn = () => {
    //provider  is a class of firebase auth which will provide the google login
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    //singInWithPopup is a method of firebase auth  which will open a popup for google login
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          let user = result.user;
          //dispatching the user data to the redux store after login
          dispatch(
            logIn({
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
            })
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}
