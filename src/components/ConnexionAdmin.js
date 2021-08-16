import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import { sha256 } from "js-sha256";

class ConnexionAdmin extends React.Component {
    constructor() {
        super();

        this.state = {
            mail_admin: "",
            mot_de_passe_admin: "",
            administrateur: {},
            redirection: false
        };
    }

    connexionAdmin = (e) => {
        e.preventDefault();
        axios.post("/tender_du_poulet/login", {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: sha256(this.state.mot_de_passe_admin)
        }).then((result) => {
            if (result.data.email_administrateur != null) {
                this.setState({ administrateur: result.data })
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

    creerSession = () => {c
        var u = {
            id_admin: this.state.administrateur.id_admin,
            mail_admin : this.state.administrateur.mail_admin,
            mot_de_passe_admin: this.state.administrateur.mot_de_passe_admin,
            telephone : this.state.administrateur.telephone,
            num_voie_admin : this.state.administrateur.num_voie_admin,
            adresse_admin : this.state.administrateur.adresse_admin,
            complement_adresse_admin: this.state.administrateur.complement_adresse_admin,
            id_ville : this.state.administrateur.id_ville

            
        }

        localStorage.setItem("utilisateur", JSON.stringify(u));
    };

    tempsSession = () => {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
    }

    render() {
        {
            var u = JSON.parse(localStorage.getItem("administrateur"));
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
                    <input type="text" name="mail_admin" onChange={this.handleChange}></input>
                    <br />
                    Mot de passe :
                    <br />
                    <input type="password" name="mot_de_passe_admin" onChange={this.handleChange}></input>
                    <br />
                    <input class="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    };

}


export default ConnexionAdmin;