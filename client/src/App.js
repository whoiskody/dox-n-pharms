import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Location from "./components/Location";
import LocationList from "./components/LocationList";
import "./App.css";

class App extends Component {
    render() {
        return (
          <div className="App">
              <Router>
                  <nav>
                    <h1>Dox-N-Pharms</h1>
                    <Link to="/">Home</Link>
                  </nav>

                    <Switch>
                      <Route exact path="/" component={LocationList}/>
                      <Route path="/location/:id" component={Location}/>
                    </Switch>
              </Router>
          </div>
        );
    }
}

export default App;

