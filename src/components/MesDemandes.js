import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class MesDemandes extends React.Component {
  constructor() {
    super();

    this.state = {
      affichage: false,
      affichage2: false,
      listeDemandes: [],
      listeNegociations: [],
      listeMessage: [],
      publicationConsultee: {},
      negociationConsultee: {},
      message: ""
    };
  }

  componentDidMount() {
    axios.post("/tender_du_poulet/findAllDemandeUtilisateur", {
      id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => { this.setState({ listeOffres: result.data }) });

  };


  affichageNego = (publication) => {
    this.setState({affichage: true, publicationConsultee: publication });
    axios.post("/tender_du_poulet/findAllNegocierPublication", {
      id_publication: publication.id_publication,
      utilisateur: {
        id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
      }
    }).then((result) => { this.setState({ listeNegociations: result.data }) });
  };

  affichageMessage = (negocier) => {
    this.setState({ affichage: false, affichage2: true, negociationConsultee: negocier });

    axios.post("/tender_du_poulet/findAllMessagePublication", {
      id_negocier: {
        publication: this.state.publicationConsultee,
        id_negociation: negocier.id_negocier.id_negociation
       }
    }).then((result) => { this.setState({ listeMessage: result.data }) });


  };

  envoyerMessage = (e) => {
    e.preventDefault();
    
    axios.post("/tender_du_poulet/addNegocier", {
      id_negocier: {
        utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
        publication: this.state.publicationConsultee,
        date: Date.now(),
        id_negociation: this.state.negociationConsultee.id_negocier.id_negociation
      },
      message: this.state.message
    }).then(this.setState({affichage: false}));

    this.setState({ affichage: false, affichage2: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    /*Verif session*/
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
      var tempsSession = localStorage.getItem("tempsSession");
    }
    if (u == null) {
      alert("Pas de session en cours, veuillez vous connecter")
      return <Redirect to="/home" />;
    }
    else if (Date.now() > tempsSession) {
      this.setState({ sessionTemps: false });
      alert("session expirée");
      localStorage.clear();
      return <Redirect to="/home" />;
    }
    if (this.state.sessionTemps == true) {
      var temps = Date.now() + 1800 * 1000;
      localStorage.setItem("tempsSession", temps);
    }
    /*Affichage message*/
    if (this.state.affichage2 == true) {
      return (
        
        <table>
        <div>Messages : </div>
        {this.state.listeMessage.map((item) => (
         
          <tbody>
            <tr>
              <th>{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {item.id_negocier.date}</th>
              <br/>{item.message}
            </tr>
            <br /><br />
          </tbody>
        )
        )}
        <input type="text" value={this.state.message} name="message" onChange={this.handleChange}></input>
        <input type="submit" onClick={this.envoyerMessage}></input>
      </table>)
    }

    /*Affichage négociation*/
    if (this.state.affichage == true) {
      return (

        <table>
          <div>Vos interlocuteurs sur cette offre </div>
          {this.state.listeNegociations.map((item) => (
            <tbody>
              <tr>
                <input type="submit" onClick={() => this.affichageMessage(item)} value="Messages"></input>
                <th>Id utilisateur : {item.id_negocier.utilisateur.id_utilisateur} |</th>
                <th>{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} |</th>
              </tr>
              <br /><br />
            </tbody>
          )
          )}
        </table>)
    }

    /*Premier affichage*/
    return (
      <div className="MesOffres">

        Mes demandes :

        <table>
          {this.state.listeDemandes.map((item) => (
            <tbody>
              <tr>
                <th><input type="submit" onClick={() => this.affichageNego(item)} value="Interlocuteurs"></input></th>
                <th>Id : {item.id_publication} |</th>
                <th>Nom : {item.nom_publication} |</th>
                <th>Prix : {item.prix} |</th>
                <th>Produit : {item.type_produit} |</th>
                <th>Date : {new Date(item.date_publication).toDateString()} |</th>
                <th>Quantite : {item.quantite} |</th>
              </tr>
              <br /><br />
            </tbody>
          )
          )}
        </table>


      </div>
    );

  }

}

export default MesDemandes;