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
          <div style={{width: "100%", textAlign: "center", position: "absolute", bottom: "5px" }}>
            Proudly Developed by <strong><a href="http://www.linkedin.com/in/george-n-stathis" target="_blank">George Stathis</a></strong>
          </div>
      </div>
    );
  }
}

export default App;
