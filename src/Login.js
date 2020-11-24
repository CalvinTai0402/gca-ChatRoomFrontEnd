import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: data.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://cdn.dribbble.com/users/599838/screenshots/4163148/chat-room-logo.jpg"
          alt="GCA"
        ></img>
        <div className="login_text">Sign in to GCA Chatroom</div>
        <Button
          onClick={() => {
            signIn();
          }}
        >
          {" "}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
export default Login;
