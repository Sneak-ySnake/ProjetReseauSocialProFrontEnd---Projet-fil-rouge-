import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Profil extends React.Component {
    constructor() {
        super();

        this.state = {
            utilisateur: JSON.parse(localStorage.getItem("utilisateur"))
        };
    }

    render() {
        {var u = JSON.parse(localStorage.getItem("utilisateur"));
        var tempsSession = localStorage.getItem("tempsSession");}
        if (u == null) {
            return <Redirect to="/" />;
        }
        if (Date.now() > tempsSession) {
            localStorage.clear();
            return <Redirect to="/" />;
        }
        return(
            <div className="Profil">

              Nom : <br/>
              {this.state.utilisateur.nom_utilisateur} <br/><br/>
              Prenom : <br/>
              {this.state.utilisateur.prenom_utilisateur} <br/><br/>
              Site Web : <br/>
              {this.state.utilisateur.site_web} <br/><br/>
              Téléphone : <br/>
              {this.state.utilisateur.telephone} <br/><br/>
              Poste occupé : <br/>
              {this.state.utilisateur.poste_occupe} <br/><br/>
              Email : <br/>
              {this.state.utilisateur.email_utilisateur} <br/><br/>
              Siret : <br/>
              {this.state.utilisateur.siret} <br/><br/>
              Entreprise : <br/>
              {this.state.utilisateur.nom_entreprise} <br/><br/>
              Adresse : <br/>
              {this.state.utilisateur.num_voie} {this.state.utilisateur.adresse} <br/><br/>
              Ville : <br/>
              {this.state.utilisateur.ville.nom_ville} <br/><br/>
              Pays : <br/>
              {this.state.utilisateur.ville.pays.nom_pays} <br/><br/>
              Domaine : <br/>
              {this.state.utilisateur.domaine.nom_domaine}<br/><br/>

            </div>
        );
    }

}

export default Profil;