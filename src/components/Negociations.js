import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class Negociations extends React.Component {
 constructor() {
    super();

    this.state = {
      affichage: false,
      listeNegociations: [],
      listeMessages: [],
      message: "",
      negocier: {}
    };
  }


  componentDidMount() {
    axios.post("/tender_du_poulet/findAllNegociationUtilisateur", {
      id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => { this.setState({ listeNegociations: result.data }) });

  };

  affichageMessage = (negocier) => {
    this.setState({ affichage: true, negocier: negocier });

    axios.post("/tender_du_poulet/findAllMessagePublication", {
      id_negocier: {
        publication: negocier.id_negocier.publication,
        id_negociation: negocier.id_negocier.id_negociation
       }
    }).then((result) => { this.setState({ listeMessages: result.data }) });
  };
   
  envoyerMessage = (e) => {
    e.preventDefault();
    
    axios.post("/tender_du_poulet/addNegocier", {
      id_negocier: {
        utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
        publication: this.state.negocier.id_negocier.publication,
        date: Date.now(),
        id_negociation: this.state.negocier.id_negocier.id_negociation
      },
      message: this.state.message
    }).then(() => this.affichageMessage(this.state.negocier));

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  retour = () => {
    this.setState({affichage: false});
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
    if (this.state.affichage == true) {
      return (
        
        <table >
          <input type="submit" value="retour" class="btn btn-primary" onClick={this.retour}></input> 
          <br/>
        <div class="message">Messages : </div>
        <br/>
        {this.state.listeMessages.map((item) => (
         
          <tbody>
            <tr class="message">
              <span class="gras">{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {(new Date(item.id_negocier.date)).toLocaleString()}</span>
              <br/>{item.message}
            </tr>
            <br /><br />
          </tbody>
        )
        )}
        <input type="text" class="form-control" value={this.state.message} name="message" onChange={this.handleChange}></input>
        <div><input type="submit"  class="btn btn-primary" onClick={this.envoyerMessage}></input> <input type="submit" value="actualiser" class="btn btn-primary" onClick={() => this.affichageMessage(this.state.negocier)}></input></div>
      </table>)
    }

    /*Premier affichage*/
    return (
      <div className="container-sm">
        <span class="message">Mes négociations :</span><br/><br/>
        <table class="test">
          {this.state.listeNegociations.map((item) => (
            <tbody>
              <tr class="card" onClick={() => this.affichageMessage(item)}> 
                <div class="card-body">
                  <div class="card-subtitle, message, gras">Publication numéro : {item.id_negocier.publication.id_publication} | {item.id_negocier.publication.nom_publication}</div><br/>
                  <div class="card-text, message"> 
                    Date : {new Date(item.id_negocier.publication.date_publication).toLocaleDateString()}<br/> 
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

export default Negociations;