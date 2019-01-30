import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";
import NavBar from "./components/NavBar";
import axios from "axios";

class App extends Component {
  constructor () {
    super();
    this.state = {
      username: ''
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.get('https://api.github.com/users/maecapozzi')
      .then(response => this.setState({username: response.data.name}))
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Switch>
              <Route path={"/"} component={Home} exact/>
              <Route path={"/about"} component={About}/>
              <Route component={Error}/>
            </Switch>
          </div>
        </BrowserRouter>
        <div className='button__container'>
          <button className='button' onClick={this.handleClick}>Click Me</button>
          <p>{this.state.username}</p>
        </div>
      </div>
    );
  }
}

export default App;
