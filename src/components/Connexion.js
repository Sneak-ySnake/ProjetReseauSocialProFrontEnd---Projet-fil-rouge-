import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import { sha256 } from "js-sha256";

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
            mot_de_passe_utilisateur: sha256(this.state.mdp)
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
            mot_de_passe_utilisateur: this.state.utilisateur.mot_de_passe_utilisateur,
            siret: this.state.utilisateur.siret,
            nom_entreprise: this.state.utilisateur.nom_entreprise,
            num_voie: this.state.utilisateur.num_voie,
            adresse: this.state.utilisateur.adresse,
            complement_adresse: this.state.utilisateur.complement_adresse,
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
                    <div id="connexionForm" class="form-group">
                        <br />
                        <label>Email :</label>
                        <br />
                        <input type="text" class="form-control" name="email" onChange={this.handleChange} required></input>
                        <br />
                        <label>Mot de passe :</label>
                        <br />
                        <input type="password" class="form-control" name="mdp" onChange={this.handleChange} required></input>
                        <br />
                        <div class="row">
                            <div class="col">
                                <a href="/inscription">s'inscrire</a>
                            </div>
                            <div class="col">
                                <input class="btn btn-success" type="submit"></input>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

}


export default Connexion;