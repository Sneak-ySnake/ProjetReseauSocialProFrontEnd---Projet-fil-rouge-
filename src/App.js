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
import { HeaderConnecte, Publier, Negociations, Profil, Marche, MesPublications,  MesDemandes, MesOffres, Deconnexion, 
  MentionLegal, CDU, PolitiqueCookies, FAQ, NousContacter, Support, Footer } from "./components";

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
          
          <Route path="/MentionLegal" exact component={() => <MentionLegal />}> <HeaderConnecte /></Route>
          <Route path="/CDU" exact component={() => <CDU />}> <HeaderConnecte /></Route>
          <Route path="/PolitiqueCookies" exact component={() => <PolitiqueCookies />}> <HeaderConnecte /></Route>
          <Route path="/FAQ" exact component={() => <FAQ />}> <HeaderConnecte /></Route>
          <Route path="/NousContacter" exact component={() => <NousContacter />}> <HeaderConnecte /></Route>
          <Route path="/Support" exact component={() => <Support />}> <HeaderConnecte /></Route>
          
          <Route render={() => <h1>404: page not found</h1>} />
          
        </Switch>

        <Footer />

      </Router>
    </div>
  )
}

export default App;
