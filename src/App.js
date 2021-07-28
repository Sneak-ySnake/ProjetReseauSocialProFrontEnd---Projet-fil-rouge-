import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import HeaderNonConnecte from './components/HeaderNonConnecte';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>

          <Route path="/">
              <HeaderNonConnecte />
          </Route>

          <Route path="/home">
              <Home />
          </Route>
          
        </Switch>

      </Router>
    </div>
  )
}

export default App;
