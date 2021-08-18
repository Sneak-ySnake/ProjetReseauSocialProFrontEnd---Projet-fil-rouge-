import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Publier extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_publication: "",
            description_publication: "",
            prix: "",
            type_produit: "",
            date_publication: "",
            quantite: "",
            utilisateur: {},
            type_publication: {},
            statut_publication: {},
            type_publications: [],
            statut_publications: [],
            sessionTemps: true
        }
    }

    addPublication = (e) => {
        e.preventDefault();
        var laDate = new Date();
        var mois = laDate.getMonth() + 1;
        if (mois < 10) {
            mois = "0" + mois
        }
        axios.post("/tender_du_poulet/publierVerification", {
            nom_publication: this.state.nom_publication,
            description_publication: this.state.description_publication,
            prix: this.state.prix,
            type_produit: this.state.type_produit,
            date_publication: laDate.getFullYear() + "-" + mois + "-" + laDate.getDate(),
            quantite: this.state.quantite,
            utilisateur: this.state.utilisateur,
            type_publication: this.state.type_publication,
            statut_publication: this.state.statut_publication,
            etat_publication: {id_etat_publication : 1}
        }).then(reponse => {
            let res = reponse.data;
            if(res){
                axios.post("/tender_du_poulet/addPublication", {
                    nom_publication: this.state.nom_publication,
                    description_publication: this.state.description_publication,
                    prix: this.state.prix,
                    type_produit: this.state.type_produit,
                    date_publication: laDate.getFullYear() + "-" + mois + "-" + laDate.getDate(),
                    quantite: this.state.quantite,
                    utilisateur: this.state.utilisateur,
                    type_publication: this.state.type_publication,
                    statut_publication: this.state.statut_publication,
                    etat_publication: {id_etat_publication : 1}
                });
                this.setState({ nom_publication: "",
                    description_publication: "",
                    prix: "",
                    type_produit: "",
                    date_publication: "",
                    quantite: "",
                    type_publication: {},
                    statut_publication: {},
                });
                document.getElementById("formulaire_publier").style.display = "none";
                document.getElementsByClassName("creationValidation")[0].style.display = "block";
            }
            else {
                alert("Veuillez saisir les champs correctement.")
            }
        });
    }

    afterSubmit = () => {
        this.setState({ nom_publication: "" });
    };
    
    cancelCourse = () => { 
        document.getElementById("formulaire_publier").reset();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeSelect = (e) => {
        this.setState({ [e.target.name]: JSON.parse(e.target.value) });
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem("utilisateur"))!=null) {
            this.setState({
                utilisateur: JSON.parse(localStorage.getItem("utilisateur"))
            });
        }
        axios.get("/tender_du_poulet/findAllTypePublication").then((result) => {
            this.setState({ type_publications: result.data });
        });
        axios.get("/tender_du_poulet/findAllStatutPublication").then((result) => {
            this.setState({ statut_publications: result.data });
        });
    }

    render() {
        {
          var u = JSON.parse(localStorage.getItem("utilisateur"));
          var tempsSession = localStorage.getItem("tempsSession");
        }
        if (u == null) {
          alert("Pas de session en cours, veuillez vous connecter")
          return <Redirect to="/" />;
        }
        else if (Date.now() > tempsSession) {
          this.setState({sessionTemps: false});
          alert("session expirée");
          localStorage.clear();
          return <Redirect to="/" />;
        }
        if (this.state.sessionTemps === true) {
          var temps = Date.now() + 1800*1000;
          localStorage.setItem("tempsSession", temps);
        }
        return (
            <div className="Publier" id="Publier">
                    <h1 class="titrePage">Publication</h1>
                    <form onSubmit={this.addPublication} id="formulaire_publier">

                        <fieldset class="form-group border p-3">
                            <legend class="w-auto px-2">Informations</legend>
                            <hr/>
                            <div class="mb-3">
                                <label>Nom publication</label>
                                <input class="form-control" type="text" name="nom_publication" value={this.state.nom_publication} onChange={this.handleChange}></input>
                            </div>
                            <div class="mb-3">
                                <label>Description publication</label>
                                <input class="form-control" type="text" name="description_publication" value={this.state.description_publication} onChange={this.handleChange}></input>
                            </div>
                            <div class="mb-3">
                                <label>Prix</label>
                                <input class="form-control" type="number" name="prix" value={this.state.prix} onChange={this.handleChange}></input>
                            </div>
                            <div class="mb-3">
                                <label>Type produit</label>
                                <input class="form-control" type="text" name="type_produit" value={this.state.type_produit} onChange={this.handleChange}></input>
                            </div>
                            <div class="mb-3">
                                <label>Quantite</label>
                                <input class="form-control" type="number" name="quantite" value={this.state.quantite} onChange={this.handleChange}></input>
                            </div>
                            <div class="mb-3">
                                <label>Type publication</label>
                                <select class="form-control" name="type_publication" onChange={this.handleChangeSelect}>
                                    <option value={JSON.stringify({ type_publication: null })}>Choisir une type publication</option>
                                    {this.state.type_publications.map(item =>
                                        <option value={JSON.stringify(item)}>{item.nom_type_publication}</option>
                                    )}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label>Statue publication</label>
                                <select class="form-control" name="statut_publication" onChange={this.handleChangeSelect}>
                                    <option value={JSON.stringify({ statut_publication: null })}>Choisir un statut publication</option>
                                    {this.state.statut_publications.map(item =>
                                        <option value={JSON.stringify(item)}>{item.nom_statut_publication}</option>
                                    )}
                                </select>
                            </div>
                        </fieldset>
                        <input type="submit" class="btn btn-success"></input>
                        <br class="clear" />

                    </form>
                    <div class="alert alert-success creationValidation" role="alert">
                        Votre Publication à bien été créé.
                    </div>
            </div>
        )
    }
}

export default Publier;