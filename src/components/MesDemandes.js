import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import profil from "./img/profil.svg";
import FormFiltrer from "../forms/FormFiltrer";
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
    this.setState({message: ""});
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
        
        <div class="container">
          <div class="fenetreDiscussion">
          <table >
            <br />
            <input type="submit" value="Retour" class="btn btn-primary" onClick={this.retour2}></input>
            <br />
            <div class="alignementGauche">Messages : </div>
            <br />
            {this.state.listeMessage.map((item) => (

              <tbody>
                <tr class="alignementGauche">
                  <span class="gras">{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {(new Date(item.id_negocier.date)).toLocaleString()}</span>
                  <br />{item.message}
                </tr>
                <br /><br />
              </tbody>
            )
            )}
          </table><br /></div>
          <input type="text" class="form-control" value={this.state.message} name="message" onChange={this.handleChange}></input>
          <div><input type="submit" class="btn btn-primary" onClick={this.envoyerMessage}></input> <input type="submit" value="Actualiser" class="btn btn-primary" onClick={() => this.affichageMessage(this.state.negociationConsultee)}></input></div>
        </div>)
    }

    /*Affichage négociation*/
    if (this.state.affichage == true) {
      return (

        <div class="container">
        <table>
          <input type="submit" value="Retour" class="btn btn-primary" onClick={this.retour}></input><br /><br />
          <div>Vos interlocuteurs sur cette offre :</div><br />
          {this.state.listeNegociations.map((item) => (
            <tbody>
              <tr class="card" onClick={() => this.affichageMessage(item)}> 
                <div class="card-body">
                  <div class="card-subtitle, alignementGauche, gras">Utilisateur : {item.id_negocier.utilisateur.id_utilisateur} <br/></div>
                </div>
                {item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur}
              </tr>
              <br /><br />
            </tbody>
          )
          )}
        </table>
        </div>)
    }

    /*Premier affichage*/
    return (
      <div class="container">

        <h1>Mes demandes</h1>

        <p><span class="color-green">Offres</span> / Demandes </p>

        <button class="btn btn-primary">
          Filtrer
        </button>
        <FormFiltrer></FormFiltrer>


          {this.state.listeDemandes.map((item) => (
             
            <div class="card publications" onClick={() => this.affichageNego(item)}>
              <div class="card-body">
                <h3 class="mb-4">{item.nom_publication}</h3> 

 
                <div class="d-flex justify-content-start my-2">
                  <div class="col">
                    <h4>Description</h4>
                    <p>{item.description_publication}</p>
                  </div>
                  <div class="col">
                    <h4>Prix :</h4>
                    <p>{item.prix} €</p>
                  {/* 
                    <h4>Quantité :</h4>
                    <p>{item.quantite}</p>
                   */}
                  
                  </div>
                  </div>
                  
                  <div class="d-flex justify-content-start ">
                  <div>
                       
                        <img
                          class="profil"
                          src={profil} 
                          height={40} width={40}
                          alt=""
                          />  
                         
                  </div>
                  <div >
                    
                    <p>Auteur<br/> Statut</p>
                     
                  
                  </div> 
                 

                  </div>
                  {/*
                <div class="card-text, alignementGauche">
                  Prix : {item.prix} | Quantite : {item.quantite}<br />
                  Produit : {item.type_produit} | Type : {item.type_publication.nom_type_publication}<br />
                  Date : {new Date(item.date_publication).toLocaleDateString()} <br />
                </div>*/}
              </div>
            </div>
            
          )
          )}
         


      </div>
    );

  }

}

export default MesDemandes;