import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: ''
    };
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
      </div>
    );
  }
}

export default App;
