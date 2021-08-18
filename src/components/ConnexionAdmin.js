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
            admin: {},
            redirection: false
        };
    }

    connexionAdmin = (e) => {
        e.preventDefault();
        axios.post("/tender_du_poulet/loginAdmin", {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: sha256(this.state.mot_de_passe_admin) 
        }).then((result) => {
            if (result.data.mail_admin != null) {
                this.setState({ admin: result.data })
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
            id_admin: this.state.admin.id_admin,
            mail_admin : this.state.admin.mail_admin,
            mot_de_passe_admin: this.state.admin.mot_de_passe_admin,
            telephone : this.state.admin.telephone,
            num_voie_admin : this.state.admin.num_voie_admin,
            adresse_admin : this.state.admin.adresse_admin,
            complement_adresse_admin: this.state.admin.complement_adresse_admin,
            ville : this.state.admin.ville

            
        }

        localStorage.setItem("admin", JSON.stringify(u));
    };

    tempsSession = () => {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
    }

    render() {
        {
            var u = JSON.parse(localStorage.getItem("admin"));
        }
        if (u != null) {
            return <Redirect to="/AdministrerUtilisateur" />;
        }
        if (this.state.redirection === true) {
            return <Redirect to="/AdministrerUtilisateur" />;
        }
        return (
            <div className="ConnexionAdmin">
                <form onSubmit={this.connexionAdmin}>
                    <div id="connexionForm" class="form-group">
                        <br />
                        <label>Email : </label>
                        <br />
                        <input type="text" class= "form-control" name="mail_admin" onChange={this.handleChange} required></input>
                        <br />
                        <label>Mot de passe : </label>
                        <br />
                        <input type="password" class="form-control" name="mot_de_passe_admin" onChange={this.handleChange}></input>
                        <br />

                    <input class="btn btn-success" type="submit"></input>
                </form>
            </div>
        );
    };

}


export default ConnexionAdmin;