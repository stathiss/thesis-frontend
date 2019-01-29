import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

const NavBar = () =>  {
	let icon = (
		<span >
			<a href="/">
				<img src="../../public/android-chrome-512x512.png"  alt="text here" /></a>
		</span>
	);
	return (
		<Navbar brand={icon} toggleNavKey={0} inverse collapseOnSelect >
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/">Tweet-ai</a>
				</Navbar.Brand>
				<Navbar.Toggle />
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