import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class MesDemandes extends React.Component {
  constructor() {
    super();

    this.state = {
        listeDemandes: []
    };
  }

  componentDidMount() {
    axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/findAllDemandeUtilisateur", {
        id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => {this.setState({listeDemandes: result.data})});
    
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
      <div className="MesDemandes">
       
        Mes demandes :

       <table>
            {this.state.listeDemandes.map((item) => (
              <tbody>
                <tr>
                  <th>Id : {item.id_publication} |</th>
                  <th>Nom : {item.nom_publication} |</th>
                  <th>Prix : {item.prix} |</th>
                  <th>Produit : {item.type_produit} |</th>
                  <th>Date : {item.date_publication} |</th>
                  <th>Quantite : {item.quantite} |</th>
                </tr>
                <br/><br/>
              </tbody>
            )
            )}
          </table>
        
        
      </div>
    );
  }

}

export default MesDemandes;