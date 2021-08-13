import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class MesDemandes extends React.Component {
  constructor() {
    super();

    this.state = {
      affichage: false,
      listeDemandes: [],
      listeNegociations: [],
      publicationConsultee: {}
    };
  }

  componentDidMount() {
    axios.post("/tender_du_poulet/findAllDemandeUtilisateur", {
      id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => { this.setState({ listeDemandes: result.data }) });

  };


  affichageNego = (id_publication) => {
    this.setState({ affichage: true });
    axios.post("/tender_du_poulet/findAllNegocierPublication", {
      id_publication: id_publication,
      utilisateur: {
        id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
      }
    }).then((result) => { this.setState({ listeNegociations: result.data }) });
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
    /*Affichage négociation*/
    if (this.state.affichage == true) {
      return (
      
      <table>
        <div>Vos interlocuteurs sur cette demande {this.state.publicationConsultee.nom_publication}</div>
        {this.state.listeNegociations.map((item) => (
          <tbody>
            <tr>
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
      <div className="Mesdemandes">

        Mes demandes :

        <table>
          {this.state.listeDemandes.map((item) => (
            <tbody>
              <tr>
                <input type="submit" onClick={() => this.affichageNego(item.id_publication)} value="Interlocuteurs"></input>
                <th>Id : {item.id_publication} |</th>
                <th>Nom : {item.nom_publication} |</th>
                <th>Prix : {item.prix} |</th>
                <th>Produit : {item.type_produit} |</th>
                <th>Date : {item.date_publication} |</th>
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