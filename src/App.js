import './App.css';
import "./css/style.css";
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
            <div class="mainAccueil">
              <Accueil />
              <Connexion />
            </div>
            <Footer />
          </Route>

          {/************************************** HEADER NON-CONNECTE ************************************************/}
          <Route path="/connexion">
            <HeaderNonConnecte />
            <div class="main">
              <Connexion />
            </div>
            <Footer />
          </Route>

          <Route path="/inscription">
            <HeaderNonConnecte />
            <div class="main">
              <Inscription />
            </div>
            <Footer />
          </Route>

          <Route path="/Deconnexion">
            <HeaderNonConnecte />
            <div class="main">
              <Deconnexion />
            </div>
              <Footer />
          </Route>

          {/************************************** HEADER CONNECTE ************************************************/}
          <Route path="/Publier"> 
            <HeaderConnecte /> 
            <div class="main">
              <Publier /> 
            </div>
            <FooterConnect />
          </Route>

          <Route path="/Negociations"> 
            <HeaderConnecte />
            <div class="main">
              <Negociations />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/Profil">
            <HeaderConnecte /> 
            <div class="main">
              <Profil />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/Marche">
            <HeaderConnecte />
            <div class="main">
              <Marche />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/MesPublications">
            <HeaderConnecte />
            <div class="main">
              <MesPublications />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/MesDemandes">
            <HeaderConnecte />
            <div class="main">
              <MesDemandes />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/MesOffres">
            <HeaderConnecte />
            <div class="main">
              <MesOffres />
            </div>
            <FooterConnect />
          </Route>

          {/*************************************** ADMINISTRATEUR **************************************/}
          <Route path="/connexionAdmin">
            <HeaderNonConnecte/>
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
            <div class="main">
              <MentionLegal />
            </div>
            <Footer />
          </Route>

          <Route path="/CDU">
            <HeaderNonConnecte />
            <div class="main">
              <CDU />
            </div>
            <Footer />
          </Route>

          <Route path="/PolitiqueCookies">
            <HeaderNonConnecte />
            <div class="main">
              <PolitiqueCookies />
            </div>
            <Footer />
          </Route>

          <Route path="/FAQ">
            <HeaderNonConnecte />
            <div class="main">
              <FAQ />
            </div>
            <Footer />
          </Route>

          <Route path="/NousContacter">
            <HeaderNonConnecte />
            <div class="main">
              <NousContacter />
            </div>
            <Footer />
          </Route>

          <Route path="/Support">
            <HeaderNonConnecte />
            <div class="main">
              <Support />
            </div>
            <Footer />
          </Route>

          {/************************************** FOOTER CONNECTER ************************************************/}
          <Route path="/MentionLegalConnect">
            <HeaderConnecte />
            <div class="main">
              <MentionLegal />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/CDUConnect">
            <HeaderConnecte />
            <div class="main">
              <CDU />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/PolitiqueCookiesConnect">
            <HeaderConnecte />
            <div class="main">
              <PolitiqueCookies />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/FAQConnect">
            <HeaderConnecte />
            <div class="main">
              <FAQ />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/NousContacterConnect">
            <HeaderConnecte />
            <div class="main">
              <NousContacter />
            </div>
            <FooterConnect />
          </Route>

          <Route path="/SupportConnect">
            <HeaderConnecte />
            <div class="main">
              <Support />
            </div>
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
