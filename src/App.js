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
import Connexion from './components/Connexion';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>

          <Route path="/home">
              <HeaderNonConnecte />
          </Route>

          <Route path="/connexion">
              <HeaderNonConnecte />
              <Connexion />
          </Route>

          <Route path="/test">
              <HeaderNonConnecte />
              <Home />
          </Route>
          
        </Switch>

      </Router>
    </div>
  )
}

export default App;
