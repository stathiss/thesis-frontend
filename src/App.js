import React, { Component } from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      })
  }


  render() {
    let {isLoaded, items} = this.state;

    const appNavbar = (
      <Navbar inverse collapseOnSelect >
        <Navbar.Header>
          <Navbar.Brand>
            <a>Tweet-ai</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="/">home</NavItem>
            <NavItem eventKey={2} href="/about">about</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    if (!isLoaded){
      return <div>Loading...</div>;
    } else {
      return (

        <div className="App">
          <div >
            {appNavbar}
          </div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
