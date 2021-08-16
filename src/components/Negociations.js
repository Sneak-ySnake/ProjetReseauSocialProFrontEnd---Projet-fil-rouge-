import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Negociations extends React.Component {
 constructor() {
    super();

    this.state = {
      affichage: false,
      listeNegociations: [],
      listeMessages: [],
      message: "",
      negociation: {}
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
    }).then(this.setState({affichage: false}));

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
    if (this.state.affichage == true) {
      return (
        
        <table>
        <div>Messages : </div>
        {this.state.listeMessages.map((item) => (
         
          <tbody>
            <tr>
              <th>{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {(new Date(item.id_negocier.date)).toString("MM/dd/yy HH:mm:ss")}</th>
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

    /*Premier affichage*/
    return (
      <div className="MesOffres">

        Mes négociations :

        <table>
          {this.state.listeNegociations.map((item) => (
            <tbody>
              <tr>
                <th><input type="submit" onClick={() => this.affichageMessage(item)} value="Messages"></input></th>
                <th>Publication : {item.id_negocier.publication.id_publication} |</th>
                <th>Publication : {item.id_negocier.publication.nom_publication} </th>
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

export default Negociations;