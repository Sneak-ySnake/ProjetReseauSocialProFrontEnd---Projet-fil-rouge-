import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { gestionSession } from "./SessionGestion";

class Profil extends React.Component {
  constructor() {
    super();

    this.state = {
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
    axios.post("/tender_du_poulet/updateUtilisateur", {
      id_utilisateur: this.state.id_utilisateur,
      nom_utilisateur: this.state.nom_utilisateur,
      prenom_utilisateur: this.state.prenom_utilisateur,
      site_web: this.state.site_web,
      telephone: this.state.telephone,
      poste_occupe: this.state.poste_occupe,
      email_utilisateur: this.state.email_utilisateur,
      siret: this.state.siret,
      nom_entreprise: this.state.nom_entreprise,
      num_voie: this.state.num_voie,
      adresse: this.state.adresse,
      complement_adresse: this.state.complement_adresse,
      domaine: this.state.domaine,
      ville: this.state.ville,
      mot_de_passe_utilisateur: "test"
    });
  };

  render() {
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
      var tempsSession = localStorage.getItem("tempsSession");
    }
    if (u == null) {
      alert("Pas de session en cours, veuillez vous connecter")
      return <Redirect to="/home" />;
    }
    else if (Date.now() > tempsSession) {
      this.setState({sessionTemps: false});
      alert("session expirée");
      localStorage.clear();
      return <Redirect to="/home" />;
    }
    if (this.state.sessionTemps == true) {
      var temps = Date.now() + 1800*1000;
      localStorage.setItem("tempsSession", temps);
    }

    return (
      <div className="Profil">
       
        <form onSubmit={this.modifProfil}>
          <br />
          Modif : <br /><br />
          <input type="submit"></input> <br/>

          Nom : <br />
          <input type="text" value={this.state.nom_utilisateur} name="nom_utilisateur" onChange={this.handleChange}></input> <br /><br />
          Prenom : <br />
          <input type="text" value={this.state.prenom_utilisateur} name="prenom_utilisateur" onChange={this.handleChange}></input> <br /><br />
          Site Web : <br />
          <input type="text" value={this.state.site_web} name="site_web" onChange={this.handleChange}></input> <br /><br />
          Téléphone : <br />
          <input type="text" value={this.state.telephone} name="telephone" onChange={this.handleChange}></input> <br /><br />
          Poste occupé : <br />
          <input type="text" value={this.state.poste_occupe} name="poste_occupe" onChange={this.handleChange}></input> <br /><br />
          Email : <br />
          <input type="text" value={this.state.email_utilisateur} name="email_utilisateur" onChange={this.handleChange}></input> <br /><br />
          Siret : <br />
          <input type="text" value={this.state.siret} name="siret" onChange={this.handleChange}></input> <br /><br />
          Entreprise : <br />
          <input type="text" value={this.state.nom_entreprise} name="nom_entreprise" onChange={this.handleChange}></input> <br /><br />
          N° de voie : <br />
          <input type="text" value={this.state.num_voie} name="num_voie" onChange={this.handleChange}></input> <br /><br />
          Adresse : <br />
          <input type="text" value={this.state.adresse} name="adresse" onChange={this.handleChange}></input> <br /><br />
          Complément Adresse : <br />
          <input type="text" value={this.state.complement_adresse} name="complement_adresse" onChange={this.handleChange}></input> <br /><br />
          Ville : <br />
          {this.state.ville.nom_ville} <br /><br />
          Domaine : <br />
          {this.state.domaine.nom_domaine}<br /><br />
          
        </form>

      </div>
    );
  }

}

export default Profil;