import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Location from "./components/Location";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Tunr</h1>
                        <div>
                            <div><Link to="/">All Locations</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/location/:id" component={Location}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
