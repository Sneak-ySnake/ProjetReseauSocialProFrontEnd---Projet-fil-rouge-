import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import FormFiltrer from "../forms/FormFiltrer";
import logo from "./img/profil.svg";

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
    /*Affichage création négociation*/
    if (this.state.affichage == true) {
      return (
        <div class="container">
          <div class="card">
            
                  <div class="card-body">
                    <div class="card-subtitle, message, gras">{this.state.publicationSelectionee.id_publication} | {this.state.publicationSelectionee.nom_publication}</div><br/>
                    <div class="card-text, message">
                      Prix : {this.state.publicationSelectionee.prix} | Quantite : {this.state.publicationSelectionee.quantite}<br/> 
                      Produit : {this.state.publicationSelectionee.type_produit} | Type : {this.state.publicationSelectionee.type_publication.nom_type_publication}<br/> 
                      Date : {new Date(this.state.publicationSelectionee.date_publication).toLocaleDateString()} <br/> 
                      Description : {this.state.publicationSelectionee.description_publication} <br/> 
                    </div>
                  </div>

            <form>  <div class="form-group">
     
          <p>Votre message pour débuter la négociation :</p>     

              <input type="textarea" rows="3" name="message" value={this.state.message} onChange={this.handleChange}></input> <br /><br />
              <input type="submit" class="btn btn-primary" onClick={this.creerNego} value="Envoyer"></input>
          </div>

            </form>
          </div>
        </div>
      );
    }

    /*Premier affichage*/
    return (
      <div className="container">

        <h1>Marché  </h1> 

        <p>Offres / Demandes</p>

        <button class="btn btn-primary">
          Filtrer
        </button>
      <FormFiltrer></FormFiltrer>
 

          {this.state.publications.map((item) => (

             
              <div class="card publications" onClick={() => this.affichage(item)}> 
                <div class="card-body">
                  <h3 class="mb-4">{item.nom_publication}</h3>
                  
                  <div class="d-flex justify-content-start my-2">
                  <div class="col">
                    <h4>Description</h4>
                    <p>{item.description_publication}</p>
                  </div>
                  <div class="col">
                    <h4>Prix :</h4>
                    <p>{item.prix} € / {item.quantite}</p>
                   
                  
                  </div>
                  </div>
                 
                 

                  <div class="d-flex justify-content-start">
                  <div >
                       
                        <img
                          class="profil"
                          src={logo} 
                          height={40} width={40}
                          alt=""
                          />  
                         
                  </div>
                  <div >
                    <p>Auteur<br/> Statut</p>
                     
                  
                  </div> 
                 

                  </div>
                 { /*<div class="card-text, message">
                  
                   <h4>Détails</h4>
                  
                   <ul>
                   <li>Produit : {item.type_produit}</li>
                   <li>Type : {item.type_publication.nom_type_publication}</li>
                   <li>Date : {new Date(item.date_publication).toLocaleDateString()}</li>
                   </ul>
                 
          </div> */ }
                </div>
              </div>
                
          )
          )}


          
       
      </div>
    );
  }

}

export default Marche;