import React from 'react';
import { Navbar, Nav, Container, NavItem} from 'react-bootstrap';
import '../style/Header.css'; 
import { Link } from "react-router-dom";
import { FaFilm } from 'react-icons/fa';
import LogoutButton from '../Logout'

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark" className="navigation">
          <Container className="nav-container">
          <Navbar.Brand className="brand ml-auto" href="/"><FaFilm /> CineWatch AI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <div className ="d-flex align-items-center">
            <NavItem><Link to="/" >Main</Link> </NavItem>
            <NavItem><Link to="/watchlist" >Watch List</Link> </NavItem>
            <NavItem><Link to="/about" >Our Team</Link> </NavItem>
            {/* <Nav.Link href="/">Main</Nav.Link>
            <Nav.Link href="/watchlist">Watch List</Nav.Link>
            <Nav.Link href="/about">Our Team</Nav.Link> */}
            <LogoutButton />
            </div>
          </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
