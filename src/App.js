import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/************************************** PAGES GENERALES ************************************************/
import Accueil from './components/Accueil';

/************************************** HEADER NON-CONNECTE ************************************************/
import Home from './components/Home';
import HeaderNonConnecte from './components/HeaderNonConnecte';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';

/************************************** HEADER CONNECTE ************************************************/
import { HeaderConnecte, Publier, Negociations, Profil, Marche, MesPublications,  MesDemandes, MesOffres, Deconnexion } from "./components"; 

/************************************** FOOTER NON-CONNECTER ************************************************/
import Footer from './components/footer/Footer';
import MentionLegal from './components/footer/MentionLegal'
import CDU from './components/footer/CDU'
import PolitiqueCookies from './components/footer/PolitiqueCookies'
import FAQ from './components/footer/FAQ'
import NousContacter from './components/footer/NousContacter'
import Support from './components/footer/Support'

/************************************** FOOTER CONNECTER ************************************************/
import FooterConnect from './components/footer/FooterConnect';

/**************************************** ADMIN ******************************************************/
import ConnexionAdmin from './components/ConnexionAdmin';
import CreerAdmin from './components/CreerAdmin';
import AdministrerUtilisateur from './components/AdministrerUtilisateur';
import HeaderAdminConnecte from './components/HeaderAdminConnecte';
import AdministrerPublication from './components/AdministrerPublication';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route exact path="/">
            <HeaderNonConnecte />
            <Accueil />
            <Connexion />
            <Footer />
          </Route>

          {/************************************** HEADER NON-CONNECTE ************************************************/}
          <Route path="/connexion">
            <HeaderNonConnecte />
            <Connexion />
            <Footer />
          </Route>

          <Route path="/inscription">
            <HeaderNonConnecte />
            <Inscription />
            <Footer />
          </Route>

          <Route path="/Deconnexion">
            <HeaderNonConnecte />
            <Deconnexion />
            <Footer />
          </Route>

          {/************************************** HEADER CONNECTE ************************************************/}
          <Route path="/Publier"> 
            <HeaderConnecte /> 
            <Publier /> 
            <FooterConnect />
          </Route>

          <Route path="/Negociations"> 
            <HeaderConnecte />
            <Negociations />
            <FooterConnect />
          </Route>

          <Route path="/Profil">
            <HeaderConnecte /> 
            <Profil />
            <FooterConnect />
          </Route>

          <Route path="/Marche">
            <HeaderConnecte />
            <Marche />
            <FooterConnect />
          </Route>

          <Route path="/MesPublications">
            <HeaderConnecte />
            <MesPublications />
            <FooterConnect />
          </Route>

          <Route path="/MesDemandes">
            <HeaderConnecte />
            <MesDemandes />
            <FooterConnect />
          </Route>

          <Route path="/MesOffres">
            <HeaderConnecte />
            <MesOffres />
            <FooterConnect />
          </Route>

          {/*************************************** ADMINISTRATEUR **************************************/}
          <Route path="/connexionAdmin">
              <HeaderAdminConnecte/> 
              <ConnexionAdmin/>
          </Route>
          
          <Route path = "/CreerAdmin">
              <HeaderAdminConnecte/> 
              <CreerAdmin/>
          </Route>

          <Route path = "/administrerUtilisateur">
              <HeaderAdminConnecte/>
              <AdministrerUtilisateur/>
          </Route>

          <Route path = "/administrerPublication">
            <HeaderAdminConnecte/>
            <AdministrerPublication/>
          </Route>
          
          {/************************************** FOOTER NON-CONNECTER ************************************************/}
          <Route path="/MentionLegal">
            <HeaderNonConnecte />
            <MentionLegal />
            <Footer />
          </Route>

          <Route path="/CDU">
            <HeaderNonConnecte />
            <CDU />
            <Footer />
          </Route>

          <Route path="/PolitiqueCookies">
            <HeaderNonConnecte />
            <PolitiqueCookies />
            <Footer />
          </Route>

          <Route path="/FAQ">
            <HeaderNonConnecte />
            <FAQ />
            <Footer />
          </Route>

          <Route path="/NousContacter">
            <HeaderNonConnecte />
            <NousContacter />
            <Footer />
          </Route>

          <Route path="/Support">
            <HeaderNonConnecte />
            <Support />
            <Footer />
          </Route>

          {/************************************** FOOTER CONNECTER ************************************************/}
          <Route path="/MentionLegalConnect">
            <HeaderConnecte />
            <MentionLegal />
            <FooterConnect />
          </Route>

          <Route path="/CDUConnect">
            <HeaderConnecte />
            <CDU />
            <FooterConnect />
          </Route>

          <Route path="/PolitiqueCookiesConnect">
            <HeaderConnecte />
            <PolitiqueCookies />
            <FooterConnect />
          </Route>

          <Route path="/FAQConnect">
            <HeaderConnecte />
            <FAQ />
            <FooterConnect />
          </Route>

          <Route path="/NousContacterConnect">
            <HeaderConnecte />
            <NousContacter />
            <FooterConnect />
          </Route>

          <Route path="/SupportConnect">
            <HeaderConnecte />
            <Support />
            <FooterConnect />
          </Route>

          {/************************************** DEFAULT ************************************************/}
          <Route render={() => 
            <div>
              <HeaderNonConnecte /> 
              <br/> 
              <h1>404: page not found</h1>
            </div>}
          />
          
        </Switch>
      </Router>
    </div>
  )
}

export default App;
