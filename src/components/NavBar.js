import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <a href='/'>
          <img className="img-responsive" src={logo} alt='logo'/>
        </a>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="/"><b>→Home</b></NavItem>
          <NavItem eventKey={2} href="/about"><b>→About</b></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;