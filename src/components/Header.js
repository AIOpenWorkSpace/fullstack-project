import React from 'react';
import { Navbar, Nav, Container, NavItem} from 'react-bootstrap';
import '../style/Header.css'; 
import { NavLink } from "react-router-dom";
import { FaFilm } from 'react-icons/fa';
import LogoutButton from '../Logout'

class Header extends React.Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark" className="navigation">
        <Container fluid className="nav-container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand className="brand" href="/"><FaFilm /> CineWatch AI</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavItem><NavLink exact activeClassName="active" className="nav-link" to="/">Search</NavLink></NavItem>
              <NavItem><NavLink activeClassName="active" className="nav-link" to="/watchlist">Watch List</NavLink></NavItem>
              <NavItem><NavLink activeClassName="active" className="nav-link" to="/about">Our Team</NavLink></NavItem>
              <NavItem><LogoutButton /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
