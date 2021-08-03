import React from "react";
import axios from "axios";
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
            domaine: {
                id_domaine: ""
            },
            ville: {
                id_ville: ""
            },
            allDomaines: [],
            allVilles: []
        };
    }

    componentDidMount() {
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/findAllDomaine").then((result) => {
            this.setState({allDomaines: result.data})
        });
        /*axios.get("/PROJET_FIL_ROUGE_tender_du_poulet/recupAllVille").then((result) => {
            this.setState({allVilles: result.data})
        });*/
    }

    ajoutUtilisateur = (e) => {
        e.preventDefault();
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/addUtilisateur", {
            nom_type_publication: this.state.nom_type_publication
        });
    };

/*
    afterSubmit = () => {
        this.setState({nom_type_publication: ""})
    };
*/
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };



    render() {
        return(
            <div className="Inscription">

                <form onSubmit={this.ajoutUtilisateur}>
                    Nom: <br/>
                    <input type="text" name="nom_utilisateur" value={this.state.nom_utilisateur}></input> <br/>
                    Prenom: <br/>
                    <input type="text" name="prenom_utilisateur" value={this.state.prenom_utilisateur}></input> <br/>
                    Site web: <br/>
                    <input type="text" name="site_web" value={this.state.site_web}></input> <br/>
                    Téléphone: <br/>
                    <input type="text" name="telephone" value={this.state.telephone}></input> <br/>
                    Poste occupé: <br/>
                    <input type="text" name="poste_occupe" value={this.state.poste_occupe}></input> <br/>
                    Email: <br/>
                    <input type="text" name="email_utilisateur" value={this.state.email_utilisateur}></input> <br/>
                    Mot de passe: <br/>
                    <input type="text" name="mot_de_passe_utilisateur" value={this.state.mot_de_passe_utilisateur}></input> <br/>
                    Siret: <br/>
                    <input type="text" name="siret" value={this.state.siret}></input> <br/>
                    Entreprise: <br/>
                    <input type="text" name="nom_entreprise" value={this.state.nom_entreprise}></input> <br/>
                    Numéro de voie: <br/>
                    <input type="number" name="num_voie" value={this.state.num_voie}></input> <br/>
                    Adresse: <br/>
                    <input type="text" name="adresse" value={this.state.adresse}></input> <br/>
                    Domaine: <br/>
                    <select name="domaine" options={this.state.allDomaines.map}>{this.state.allDomaines.id_domaine}</select> <br/>
                    


                    <input class="btn btn-primary" type="submit"></input>
                </form>

            </div>
        );
    }

}


export default Inscription;