import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/************************************** HEADER NON-CONNECTE ************************************************/
import Home from './components/Home';
import HeaderNonConnecte from './components/HeaderNonConnecte';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';

/************************************** HEADER CONNECTE ************************************************/
import { HeaderConnecte, Publier, Negociations, Profil, Marche, MesPublications,  MesDemandes, MesOffres, Deconnexion } from "./components"; 

/************************************** FOOTER ************************************************/
import Footer from './components/footer/Footer';
import MentionLegal from './components/footer/MentionLegal'
import CDU from './components/footer/CDU'
import PolitiqueCookies from './components/footer/PolitiqueCookies'
import FAQ from './components/footer/FAQ'
import NousContacter from './components/footer/NousContacter'
import Support from './components/footer/Support'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/************************************** HEADER NON-CONNECTE ************************************************/}
          <Route path="/home">
              <HeaderNonConnecte />
          </Route>

          <Route path="/connexion">
              <HeaderNonConnecte />
              <Connexion />
          </Route>

          <Route path="/inscription">
              <HeaderNonConnecte />
              <Inscription />
          </Route>

          <Route path="/test">
              <HeaderNonConnecte />
              <Home />
          </Route>

          {/************************************** HEADER CONNECTE ************************************************/}
          <Route path="/Publier"> 
            <HeaderConnecte /> 
            <Publier /> 
          </Route>

          <Route path="/Negociations"> 
            <HeaderConnecte />
            <Negociations />
          </Route>

          <Route path="/Profil">
            <HeaderConnecte /> 
            <Profil />
          </Route>

          <Route path="/Marche">
            <HeaderConnecte />
            <Marche />
          </Route>

          <Route path="/MesPublications">
            <HeaderConnecte />
            <MesPublications />
          </Route>

          <Route path="/MesDemandes">
            <HeaderConnecte />
            <MesDemandes />
          </Route>

          <Route path="/MesOffres">
            <HeaderConnecte />
            <MesOffres />
          </Route>

          <Route path="/Deconnexion">
            <HeaderConnecte />
            <Deconnexion />
          </Route>
          
          {/************************************** FOOTER ************************************************/}
          <Route path="/MentionLegal">
            <HeaderConnecte />
            <MentionLegal />
          </Route>

          <Route path="/CDU">
            <HeaderConnecte />
            <CDU />
          </Route>

          <Route path="/PolitiqueCookies">
            <HeaderConnecte />
            <PolitiqueCookies />
          </Route>

          <Route path="/FAQ">
            <HeaderConnecte />
            <FAQ />
          </Route>

          <Route path="/NousContacter">
            <HeaderConnecte />
            <NousContacter />
          </Route>

          <Route path="/Support">
            <HeaderConnecte />
            <Support />
          </Route>

          {/************************************** DEFAULT ************************************************/}
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>

        <Footer />
      </Router>
    </div>
  )
}

export default App;
