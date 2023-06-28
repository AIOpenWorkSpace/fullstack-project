import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaFilm } from 'react-icons/fa';
import './style/LoginButton.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <div className="login-box">
        <h1><FaFilm></FaFilm> Welcome to CineWatch AI</h1>
        <p>Please Log In To Continue</p>
        <button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>
      </div>
      
    </div>
  )
};

export default LoginButton;
