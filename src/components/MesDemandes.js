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
    }).then((result) => { this.setState({ listeDemandes: result.data }) });

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
    }).then(() => this.affichageMessage(this.state.negociationConsultee));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  retour = () => {
    this.setState({affichage: false})
  }

  retour2 = () => {
    this.setState({affichage2: false, affichage: true})
  }

  render() {
    /*Verif session*/
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
      var tempsSession = localStorage.getItem("tempsSession");
    }
    if (u == null) {
      alert("Pas de session en cours, veuillez vous connecter")
      return <Redirect to="/" />;
    }
    else if (Date.now() > tempsSession) {
      this.setState({ sessionTemps: false });
      alert("session expirée");
      localStorage.clear();
      return <Redirect to="/" />;
    }
    if (this.state.sessionTemps == true) {
      var temps = Date.now() + 1800 * 1000;
      localStorage.setItem("tempsSession", temps);
    }
    /*Affichage message*/
    if (this.state.affichage2 == true) {
      return (
        
        <table>
          <input type="submit" value="Retour" onClick={this.retour2}></input><input type="submit" value="Actualiser" onClick={() => this.affichageMessage(this.state.negociationConsultee)}></input><br/><br/>
        <div>Messages : </div>
        {this.state.listeMessage.map((item) => (
         
          <tbody>
            <tr>
              <th>{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {(new Date(item.id_negocier.date)).toLocaleString()}</th>
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
          <input type="submit" value="Retour" onClick={this.retour}></input><br/><br/>
          <div>Vos interlocuteurs sur cette demande </div>
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
      <div className="MesDemandes">

        Mes demandes :

        <table>
          {this.state.listeDemandes.map((item) => (
            <tbody>
              <tr class="card" onClick={() => this.affichage(item)}> 
                <div class="card-body">
                  <div class="card-subtitle, message, gras">{item.id_publication} | {item.nom_publication}</div><br/>
                  <div class="card-text, message">
                    Prix : {item.prix} | Quantite : {item.quantite}<br/> 
                    Produit : {item.type_produit} | Type : {item.type_publication.nom_type_publication}<br/> 
                    Date : {new Date(item.date_publication).toLocaleDateString()} <br/> 
                  </div>
                </div>
              </tr>
              <br /><br />
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