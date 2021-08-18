import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { sha256 } from "js-sha256";
import "bootstrap/dist/css/bootstrap.min.css";

class Inscription extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_utilisateur: "",
            prenom_utilisateur: "",
            site_web: "",
            telephone: "",
            poste_occupe: "",
            email_utilisateur: "",
            mot_de_passe_utilisateur: "",
            siret: "",
            nom_entreprise: "",
            num_voie: "",
            adresse: "",
            complement_adresse: "",
            ville: {},
            domaine: {},
            domaines: [],
            villes: [],
            grossiste: "",
            distributeur: "",
            detaillant: "",

            id_rechercher : "",
            profil1: false,
            profil2: false,
            profil3: false,

            redirection: false
        }
    }

    addUtilisateur = (e) => {
        e.preventDefault();
        ////// VERIFICATIONS des PROFILS /////////
        if(this.state.profil1 || this.state.profil2 || this.state.profil3){
            ////// VERIFICATIONS des INFO de l'UTILISATEUR /////////
            axios.post("/tender_du_poulet/inscriptionVerification", {
                nom_utilisateur: this.state.nom_utilisateur,
                prenom_utilisateur: this.state.prenom_utilisateur,
                site_web: this.state.site_web,
                telephone: this.state.telephone,
                poste_occupe: this.state.poste_occupe,
                email_utilisateur: this.state.email_utilisateur,
                mot_de_passe_utilisateur: sha256(this.state.mot_de_passe_utilisateur),
                siret: this.state.siret,
                nom_entreprise: this.state.nom_entreprise,
                num_voie: this.state.num_voie,
                adresse: this.state.adresse,
                complement_adresse: this.state.complement_adresse,
                domaine: this.state.domaine,
                ville: this.state.ville
            }).then(reponse => {
                let res = reponse.data;
                if(res){
                    ////// VERIFICATIONS de l'EMAIL /////////
                    axios.post("/tender_du_poulet/findUtilisateurByEmail_utilisateur", {
                        email_utilisateur: this.state.email_utilisateur,
                        mot_de_passe_utilisateur: sha256(this.state.mot_de_passe_utilisateur),
                    }).then((result) => {
                        if(result.data.email_utilisateur != null){
                            alert("Adresse e-mail déja existant. Veuillez le changer.");
                        } else {
                            ////// AJOUT de UTILISATEUR /////////
                            axios.post("/tender_du_poulet/addUtilisateur", {
                                nom_utilisateur: this.state.nom_utilisateur,
                                prenom_utilisateur: this.state.prenom_utilisateur,
                                site_web: this.state.site_web,
                                telephone: this.state.telephone,
                                poste_occupe: this.state.poste_occupe,
                                email_utilisateur: this.state.email_utilisateur,
                                mot_de_passe_utilisateur: sha256(this.state.mot_de_passe_utilisateur),
                                siret: this.state.siret,
                                nom_entreprise: this.state.nom_entreprise,
                                num_voie: this.state.num_voie,
                                adresse: this.state.adresse,
                                complement_adresse: this.state.complement_adresse,
                                domaine: this.state.domaine,
                                ville: this.state.ville
                            }).then(() => {
                                ////// AJOUT de l'ETAT COMPTE de l'UTILISATEUR /////////
                                var laDate = new Date();
                                var mois = laDate.getMonth() + 1;
                                if (mois < 10) {
                                    mois = "0" + mois
                                }
                                axios.post("/tender_du_poulet/findUtilisateurByEmail_utilisateur" , {
                                    email_utilisateur: this.state.email_utilisateur
                                }).then(reponse2 => {
                                    this.setState({id_rechercher: reponse2.data.id_utilisateur})
                                    axios.post("/tender_du_poulet/addUtilisateur_EtatCompte", {
                                        utilisateur_EtatCompteId: {
                                            utilisateur : { id_utilisateur : this.state.id_rechercher},
                                            etat_compte : { id_etat_compte : 1},
                                            date_debut: laDate.getFullYear() + "-" + mois + "-" + laDate.getDate()
                                        }
                                    });
            
                                    ////// AJOUT des PROFILS de l'UTILISATEUR /////////
                                    if(this.state.profil1){
                                        axios.post("/tender_du_poulet/addUtilisateur_Profil", {
                                            utilisateur_ProfilId: {
                                                utilisateur : { id_utilisateur : this.state.id_rechercher},
                                                profil : { id_profil : 1}
                                            }
                                        });
                                    }
                                    if(this.state.profil2){
                                        axios.post("/tender_du_poulet/addUtilisateur_Profil", {
                                            utilisateur_ProfilId: {
                                                utilisateur : { id_utilisateur : this.state.id_rechercher},
                                                profil : { id_profil : 2}
                                            }
                                        });
                                    }
                                    if(this.state.profil3){
                                        axios.post("/tender_du_poulet/addUtilisateur_Profil", {
                                            utilisateur_ProfilId: {
                                                utilisateur : { id_utilisateur : this.state.id_rechercher},
                                                profil : { id_profil : 3}
                                            }
                                        });
                                    }
                                    this.setState({redirection: true});
                                });
                            });
                        }
                    });
                } 
                else {
                    alert("Veuillez saisir les champs correctement.");
                }
            });
        } else {
            alert("Veuillez choisir au moins un profil");
        }
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeSelect = (e) => {
        this.setState({ [e.target.name]: JSON.parse(e.target.value) });
    }
    handleClickProfil1 = (e) => {
        this.setState({
            profil1: !this.state.profil1
        });
        /*alert(this.state.profil1)
        alert(this.state.profil3)*/
    }
    handleClickProfil2 = (e) => {
        this.setState({
            profil2: !this.state.profil2
        });
        //alert(this.state.profil2)
    }
    handleClickProfil3 = (e) => {
        this.setState({
            profil3: !this.state.profil3
        });
        /*alert(this.state.profil1)
        alert(this.state.profil3)*/
    }

    componentDidMount() {
        axios.get("/tender_du_poulet/findAllDomaine").then((result) => {
            this.setState({ domaines: result.data });
        });
        axios.get("/tender_du_poulet/findAllVille").then((result) => {
            this.setState({ villes: result.data });
        });
    }

    render() {
        if (this.state.redirection == true) {
            return <Redirect to="/" />;
        }
        return (
            <div className="Inscription">
                <ul>
                    <h3>Inscription</h3>
                    <form
                        onSubmit={this.addUtilisateur}
                    >
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Site Web</th>
                                    <th>Téléphone</th>
                                    <th>Poste Occupé</th>
                                    <th>Adresse e-mail</th>
                                    <th>Mot de Passe</th>
                                    <th>Siret</th>
                                    <th>Nom de l'entreprise</th>
                                    <th>N° Voie</th>
                                    <th>Adresse</th>
                                    <th>Complement Adresse</th>
                                    <th>Ville</th>
                                    <th>Domaine</th>
                                    <th>Profil</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <input type="text" name="nom_utilisateur" value={this.state.nom_utilisateur} onChange={this.handleChange}></input>
                                    </th>
                                    <td>
                                        <input type="text" name="prenom_utilisateur" value={this.state.prenom_utilisateur} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="site_web" value={this.state.site_web} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="telephone" value={this.state.telephone} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="poste_occupe" value={this.state.poste_occupe} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="email_utilisateur" value={this.state.email_utilisateur} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="password" name="mot_de_passe_utilisateur" value={this.state.mot_de_passe_utilisateur} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="siret" value={this.state.siret} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="nom_entreprise" value={this.state.nom_entreprise} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="num_voie" value={this.state.num_voie} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="complement_adresse" value={this.state.complement_adresse} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <select name="ville" onChange={this.handleChangeSelect}>
                                            <option value={JSON.stringify({ ville: null })}>Choisir une ville</option>
                                            {this.state.villes.map(item =>
                                                <option value={JSON.stringify(item)}>{item.nom_ville}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="domaine" onChange={this.handleChangeSelect}>
                                            <option value={JSON.stringify({ domaine: null })}>Choisir un domaine</option>
                                            {this.state.domaines.map(item =>
                                                <option value={JSON.stringify(item)}>{item.nom_domaine}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                <input type="checkbox" name="profil1" onChange={this.handleClickProfil1}></input>
                                                <label for="profil1">Grossite</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="profil2" onChange={this.handleClickProfil2}></input>
                                                <label for="profil2">Distributeur</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="profil3" onChange={this.handleClickProfil3}></input>
                                                <label for="profil3">Détaillant</label>
                                            </li>
                                        </ul>
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

export default Inscription;