import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class MesOffres extends React.Component {
  constructor() {
    super();

    this.state = {
      affichage: false,
      listeOffres: [],
      listeNegociations: [],
      publicationConsultee: {}
    };
  }

  componentDidMount() {
    axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/findAllOffreUtilisateur", {
      id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => { this.setState({ listeOffres: result.data }) });

  };


  affichageNego = (id_publication) => {
    this.setState({ affichage: true });
    axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/findAllNegocierPublication", {
      id_publication: id_publication
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
        <div>Vos interlocuteurs sur cette offre {this.state.publicationConsultee.nom_publication}</div>
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
      <div className="MesOffres">

        Mes offres :

        <table>
          {this.state.listeOffres.map((item) => (
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

export default MesOffres;