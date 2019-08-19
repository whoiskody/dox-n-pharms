import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LocationList from "./components/LocationList";
import Location from "./components/Location";
import Doctor from "./components/Doctor";
import Pharmacy from "./components/Pharmacy";
import NewLocationsForm from "./components/NewLocationsForm";
import NewDoctorsForm from "./components/NewDoctorsForm";
import NewPharmsForm from "./components/NewPharmsForm";
import "./App.css";


class App extends Component {
    render() {
        return (
              <Router>
          <div className="App">
                  <nav>
                    <h1>Dox-N-Pharms</h1>
                    <Link to="/">Home</Link>
                  </nav>

                    <Switch>
                      <Route exact path="/" component={LocationList}/>
                      <Route path="/locations/:id/doctors/new" component={NewDoctorsForm}/>
                      <Route path="/locations/:id/pharmacies/new" component={NewPharmsForm}/>
                      <Route path="/locations/:id" component={Location}/>
                      <Route path="/new" component={NewLocationsForm}/>
                      <Route path="/doctors/:id" component={Doctor}/>
                      <Route path="/pharmacies/:id" component={Pharmacy}/>
                    </Switch>
          </div>
              </Router>
        );
    }
}

export default App;

