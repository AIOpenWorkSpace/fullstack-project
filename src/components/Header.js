import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Header.css'; 

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="title">Movies Company</div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navigation">
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/watchlist" className="nav-link">
              Watch List
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
        </Navbar>
      </div>
    );
  }
}

export default Header;
