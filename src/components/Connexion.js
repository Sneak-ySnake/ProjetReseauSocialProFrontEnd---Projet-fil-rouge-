import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

class Connexion extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            mdp: "",
            utilisateur: {},
            redirection: false
        };
    }

    connexion = (e) => {
        e.preventDefault();
        axios.post("/tender_du_poulet/login", {
            email_utilisateur: this.state.email,
            mot_de_passe_utilisateur: this.state.mdp
        }).then((result) => {
            if (result.data.email_utilisateur != null) {
                this.setState({ utilisateur: result.data })
                this.creerSession();
                this.tempsSession();
                this.setState({ redirection: true });
            }
            else {
                alert("Erreur");
            }
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    creerSession = () => {
        var u = {
            id_utilisateur: this.state.utilisateur.id_utilisateur,
            nom_utilisateur: this.state.utilisateur.nom_utilisateur,
            prenom_utilisateur: this.state.utilisateur.prenom_utilisateur,
            site_web: this.state.utilisateur.site_web,
            telephone: this.state.utilisateur.telephone,
            poste_occupe: this.state.utilisateur.poste_occupe,
            email_utilisateur: this.state.utilisateur.email_utilisateur,
            siret: this.state.utilisateur.siret,
            nom_entreprise: this.state.utilisateur.nom_entreprise,
            num_voie: this.state.utilisateur.num_voie,
            adresse: this.state.utilisateur.adresse,
            domaine: this.state.utilisateur.domaine,
            ville: this.state.utilisateur.ville
        }

        localStorage.setItem("utilisateur", JSON.stringify(u));
    };

    tempsSession = () => {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
    }

    render() {
        {
            var u = JSON.parse(localStorage.getItem("utilisateur"));
        }
        if (u != null) {
            return <Redirect to="/profil" />;
        }
        if (this.state.redirection == true) {
            return <Redirect to="/profil" />;
        }
        return (
            <div className="Connexion">
                <form onSubmit={this.connexion}>
                    <br />
                    Email :
                    <br />
                    <input type="text" name="email" onChange={this.handleChange}></input>
                    <br />
                    Mot de passe :
                    <br />
                    <input type="password" name="mdp" onChange={this.handleChange}></input>
                    <br />
                    <input class="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    };

}


export default Connexion;