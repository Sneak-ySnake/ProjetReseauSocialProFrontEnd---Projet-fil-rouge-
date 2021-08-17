import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Marche extends React.Component {
  constructor() {
    super();

    this.state = {
      publications: [],
      publicationSelectionee: {},
      message: "",
      affichage: false,
      date_transformer : ""
    };
  }

  componentDidMount() {
    axios.get("/tender_du_poulet/findAllPublication")
      .then((result) => { this.setState({ publications: result.data }) });
  };

  affichage = (id) => {
    this.setState({publicationSelectionee: id, affichage: true});
  };

  creerNego = (e) => {
    e.preventDefault();

    var nombre = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
    var id = ""+this.state.publicationSelectionee.id_publication
    +JSON.parse(localStorage.getItem("utilisateur")).prenom_utilisateur+JSON.parse(localStorage.getItem("utilisateur")).nom_utilisateur
    +""+nombre;
    
    axios.post("/tender_du_poulet/negocierVerification", {
      id_negocier: {
        utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
        publication: this.state.publicationSelectionee,
        date: Date.now(),
        id_negociation: id
      },
      message: this.state.message
    }).then(reponse => {
      if (reponse.data){
        axios.post("/tender_du_poulet/addNegocier", {
          id_negocier: {
            utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
            publication: this.state.publicationSelectionee,
            date: Date.now(),
            id_negociation: id
          },
          message: this.state.message
        }).then(this.setState({affichage: false}));
      } else {
        alert("Veuillez saisir votre message.");
      }
    })
  };

  /*convertirDate = (e) => {
    e.preventDefault();
    axios.post("/tender_du_poulet/dateFormater", {

    }).then(result => {
      this.setState({date_transformer: result.data})
    });
  }*/

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
      var tempsSession = localStorage.getItem("tempsSession");
    }
    if (u == null) {
      alert("Pas de session en cours, veuillez vous connecter");
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
    /*Affichage création négociation*/
    if (this.state.affichage == true) {
      return (
        <div>
          <form>
            Votre message pour débuter la négociation : <br/><br/>
            <input type="textarea" name="message" value={this.state.message} onChange={this.handleChange}></input> <br /><br />
            <input type="submit" onClick={this.creerNego} value="Envoyer"></input>
          </form>
        </div>
      );
    }

    /*Premier affichage*/
    return (
      <div className="container">

        Publications du marché : <br/><br/>

        <table>

          {this.state.publications.map((item) => (

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
              
            </tbody>
          )
          )}
        </table>

      </div>
    );
  }

}

export default Marche;