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
      affichage: false
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
    
    axios.post("/tender_du_poulet/addNegocier", {
      id_negocier: {
        utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
        publication: this.state.publicationSelectionee,
        date: Date.now(),
        id_negociation: id
      },
      message: this.state.message
    }).then(this.setState({affichage: false}));
  };

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
            <input type="textarea" name="message" value={this.state.message} onChange={this.handleChange}></input> <br /><br />
            <input type="submit" onClick={this.creerNego} value="Envoyer"></input>
          </form>
        </div>
      );
    }

    /*Premier affichage*/
    return (
      <div className="Marche">

        Publications du marché :

        <table>

          {this.state.publications.map((item) => (
            <tbody>
              <tr>
              <th><input type="submit" onClick={() => this.affichage(item)} value="Négocier"></input></th>
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

export default Marche;