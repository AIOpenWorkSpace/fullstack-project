import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaFilm } from 'react-icons/fa';
import './style/Login.css';
import { Container, Row, Col } from 'react-bootstrap';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6} sm={8} xs={12} className="login-box">
            <h1><FaFilm></FaFilm> Welcome to CineWatch AI</h1>
            <p>Please Log In To Continue</p>
            <button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default LoginButton;
