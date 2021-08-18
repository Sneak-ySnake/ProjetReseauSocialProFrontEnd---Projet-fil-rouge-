import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { sha256 } from "js-sha256";
import "bootstrap/dist/css/bootstrap.min.css";
import { gestionSession } from "./SessionGestion";

class Profil extends React.Component {
  constructor() {
    super();

    this.state = {
      utilisateur: {},
      id_utilisateur: "",
      nom_utilisateur: "",
      prenom_utilisateur: "",
      site_web: "",
      telephone: "",
      poste_occupe: "",
      email_utilisateur: "",
      siret: "",
      nom_entreprise: "",
      num_voie: "",
      adresse: "",
      complement_adresse: "",
      domaine: {},
      ville: {},
      sessionTemps: true
    };
  }

  componentDidMount() {
    if(JSON.parse(localStorage.getItem("utilisateur"))!=null) {
      this.setState({
      
        id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur,
        nom_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).nom_utilisateur,
        prenom_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).prenom_utilisateur,
        site_web: JSON.parse(localStorage.getItem("utilisateur")).site_web,
        telephone: JSON.parse(localStorage.getItem("utilisateur")).telephone,
        poste_occupe: JSON.parse(localStorage.getItem("utilisateur")).poste_occupe,
        email_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).email_utilisateur,
        mot_de_passe_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).mot_de_passe_utilisateur,
        siret: JSON.parse(localStorage.getItem("utilisateur")).siret,
        nom_entreprise: JSON.parse(localStorage.getItem("utilisateur")).nom_entreprise,
        num_voie: JSON.parse(localStorage.getItem("utilisateur")).num_voie,
        adresse: JSON.parse(localStorage.getItem("utilisateur")).adresse,
        complement_adresse: JSON.parse(localStorage.getItem("utilisateur")).complement_adresse,
        domaine: JSON.parse(localStorage.getItem("utilisateur")).domaine,
        ville: JSON.parse(localStorage.getItem("utilisateur")).ville
      
    });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  modifProfil = (e) => {
    e.preventDefault();
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
        axios.post("/tender_du_poulet/updateUtilisateur", {
          id_utilisateur: this.state.id_utilisateur,
          nom_utilisateur: this.state.nom_utilisateur,
          prenom_utilisateur: this.state.prenom_utilisateur,
          site_web: this.state.site_web,
          telephone: this.state.telephone,
          poste_occupe: this.state.poste_occupe,
          email_utilisateur: this.state.email_utilisateur,
          mot_de_passe_utilisateur: this.state.mot_de_passe_utilisateur,
          siret: this.state.siret,
          nom_entreprise: this.state.nom_entreprise,
          num_voie: this.state.num_voie,
          adresse: this.state.adresse,
          complement_adresse: this.state.complement_adresse,
          domaine: this.state.domaine,
          ville: this.state.ville
        }).then(() => {
          var u = {
            id_utilisateur: this.state.id_utilisateur,
            nom_utilisateur: this.state.nom_utilisateur,
            prenom_utilisateur: this.state.prenom_utilisateur,
            site_web: this.state.site_web,
            telephone: this.state.telephone,
            poste_occupe: this.state.poste_occupe,
            email_utilisateur: this.state.email_utilisateur,
            mot_de_passe_utilisateur: this.state.mot_de_passe_utilisateur,
            siret: this.state.siret,
            nom_entreprise: this.state.nom_entreprise,
            num_voie: this.state.num_voie,
            adresse: this.state.adresse,
            complement_adresse: this.state.complement_adresse,
            domaine: this.state.domaine,
            ville: this.state.ville
          }
          localStorage.setItem("utilisateur", JSON.stringify(u));
          document.getElementById("Profil").style.display = "none";
          document.getElementsByClassName("ModificationValidation")[0].style.display = "block";
        });
      }
    });
  };

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
    if (this.state.sessionTemps == true) {
      var temps = Date.now() + 1800*1000;
      localStorage.setItem("tempsSession", temps);
    }

    return (
      <div className="Profil" id="Profil">
        <h1 class="titrePage">Profil</h1>


        <form onSubmit={this.modifProfil}>
          <fieldset class="form-group border p-3">
            <legend class="w-auto px-2">Informations</legend>
            <hr/>
            <div class="mb-3">
                <label>Nom</label>
                <input class="form-control" type="text" name="nom_utilisateur" value={this.state.nom_utilisateur} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Prenom</label>
                <input class="form-control" type="text" name="prenom_utilisateur" value={this.state.prenom_utilisateur} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Site Web</label>
                <input class="form-control" type="text" name="site_web" value={this.state.site_web} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Téléphone</label>
                <input class="form-control" type="text" name="telephone" value={this.state.telephone} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Poste Occupé</label>
                <input class="form-control" type="text" name="poste_occupe" value={this.state.poste_occupe} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Adresse e-mail</label>
                <input class="form-control" type="text" name="email_utilisateur" value={this.state.email_utilisateur} onChange={this.handleChange}></input>
            </div>
          </fieldset>

          <fieldset class="form-group border p-3">
            <legend class="w-auto px-2">Entreprise</legend>
            <hr/>
            <div class="mb-3">
                <label>Siret</label>
                <input class="form-control" type="text" name="siret" value={this.state.siret} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Nom de l'entreprise</label>
                <input class="form-control" type="text" name="nom_entreprise" value={this.state.nom_entreprise} onChange={this.handleChange}></input>
            </div>
          </fieldset>
                          
          <fieldset class="form-group border p-3">
            <legend class="w-auto px-2">Adresse</legend>
            <hr/>
            <div class="mb-3">
                <label>N° Voie</label>
                <input class="form-control" type="text" name="num_voie" value={this.state.num_voie} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
                <label>Adresse</label>
                <input class="form-control" type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
              <label>Complement Adresse</label>
              <input class="form-control" type="text" name="complement_adresse" value={this.state.complement_adresse} onChange={this.handleChange}></input>
            </div>
            <div class="mb-3">
              <label>Ville</label>
              <label>{this.state.ville.nom_ville}</label>
            </div>
          </fieldset>

          <fieldset class="form-group border p-3">
              <legend class="w-auto px-2">Domaine</legend>
              <hr/>
              <div class="mb-3">
                <label>Domaine</label>
                <label>{this.state.domaine.nom_domaine}</label>
              </div>
          </fieldset>

          <input type="submit" class="btn btn-success" value="Modifier"></input>
          <br class="clear" />
        </form>

        <div class="alert alert-success ModificationValidation" role="alert">
            Votre Profil a été modifier avec succée.
        </div>

      </div>
    );
  }
}

export default Profil;