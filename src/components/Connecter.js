import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { HeaderConnecte, Footer, Publier, Negociations, Profil, Marche, MesPublications, MesDemandes, MesOffres, Deconnexion } from "./components";


function Connecter() {
    return (
      <div className="Connecter">
        <Router>
            <HeaderConnecte />
            <Switch>
                <Route path="/Publier" exact component={() => <Publier />} />
                <Route path="/Negociations" exact component={() => <Negociations />} />
                <Route path="/Profil" exact component={() => <Profil />} />
                <Route path="/Marche" exact component={() => <Marche />} />
                <Route path="/MesPublications" exact component={() => <MesPublications />} />
                <Route path="/MesDemandes" exact component={() => <MesDemandes />} />
                <Route path="/MesOffres" exact component={() => <MesOffres />} />
                <Route path="/Deconnexion" exact component={() => <Deconnexion />} />
            </Switch>
            <Footer />
        </Router>
      </div>
    )
  }
  
  export default Connecter;