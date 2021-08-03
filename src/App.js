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
import { HeaderConnecte, Footer, Publier, Negociations, Profil, Marche, MesPublications, MesDemandes, MesOffres, Deconnexion } from "./components";

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

          
          <Route path="/Publier" exact component={() => <Publier />}> <HeaderConnecte /></Route>
          <Route path="/Negociations" exact component={() => <Negociations />}> <HeaderConnecte /></Route>
          <Route path="/Profil" exact component={() => <Profil />}> <HeaderConnecte /></Route>
          <Route path="/Marche" exact component={() => <Marche />}> <HeaderConnecte /></Route>
          <Route path="/MesPublications" exact component={() => <MesPublications />}> <HeaderConnecte /></Route>
          <Route path="/MesDemandes" exact component={() => <MesDemandes />}> <HeaderConnecte /></Route>
          <Route path="/MesOffres" exact component={() => <MesOffres />}> <HeaderConnecte /></Route>
          <Route path="/Deconnexion" exact component={() => <Deconnexion />}> <HeaderConnecte /></Route>
          
        </Switch>

      </Router>
    </div>
  )
}

export default App;
