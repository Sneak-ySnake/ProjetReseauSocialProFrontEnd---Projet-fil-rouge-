import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { sha256 } from "js-sha256";
import "bootstrap/dist/css/bootstrap.min.css";

class CreerAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            mail_admin: "",
            mot_de_passe_admin: "",
            telephone: "",
            num_voie_admin: "",
            adresse_admin: "",
            complement_adresse_admin: "",
            ville: {},
            villes: [],
            redirection : false
        }
    }

   addAdmin = (e) => {
        e.preventDefault();
        axios.post("/tender_du_poulet/addAdmin", {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: this.state.mot_de_passe_admin,
            telephone: this.state.telephone,
            num_voie_admin: this.state.num_voie_admin,
            adresse_admin: this.state.adresse_admin,
            complement_adresse_admin: this.state.complement_adresse_admin,
            ville: this.state.ville
        }).then((result)=> {
            if (result.data === true) {
                this.creerSession();
                this.setState({redirection: true});
            }
            else {
                alert ("erreur");
            }
        });
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleChangeSelect = (e) => {
        this.setState({ [e.target.name]: JSON.parse(e.target.value) });
        
    }

    creerSession = () => {
        var s = {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: this.state.mot_de_passe_admin,
        }
        localStorage.setItem("administrateur", JSON.stringify(s));
    };

    componentDidMount() {
        axios.get("/tender_du_poulet/findAllVille").then((result) => {
            this.setState({ villes: result.data });
        });
    }


    render() {
        
        return (
            <div className="CreerAdmin">
                <ul>
                    <h3>Creer administrateur</h3>
                    <form
                        onSubmit={this.addAdmin}
                    >
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Mail admin</th>
                                    <th>Mot de Passe</th>
                                    <th>Téléphone</th>
                                    <th>N° Voie</th>
                                    <th>Adresse</th>
                                    <th>Complement Adresse</th>
                                    <th>Ville</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                                    
                                    <td>
                                        <input type="text" name="mail_admin" value={this.state.mail_admin} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="password" name="mot_de_passe_admin" value={this.state.mot_de_passe_admin} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="telephone" value={this.state.telephone} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="num_voie_admin" value={this.state.num_voie_admin} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="adresse_admin" value={this.state.adresse_admin} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="complement_adresse_admin" value={this.state.complement_adresse_admin} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <select name="ville" onChange={this.handleChangeSelect}>
                                            <option value={JSON.stringify({ ville: null })}>Choisir une ville</option>
                                            {this.state.villes.map(item =>
                                                <option value={JSON.stringify(item)}>{item.nom_ville}</option>
                                            )}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit"></input>
                    </form>
                </ul>
            </div>
        )
    }
}

export default CreerAdmin;