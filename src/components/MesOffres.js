import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import profil from "./img/profil.svg";
import FormFiltrer from "../forms/FormFiltrer";
class MesOffres extends React.Component {
  constructor() {
    super();

    this.state = {
      affichage: false,
      affichage2: false,
      listeOffres: [],
      listeNegociations: [],
      listeMessage: [],
      publicationConsultee: {},
      negociationConsultee: {},
      message: ""
    };
  }

  componentDidMount() {
    axios.post("/tender_du_poulet/findAllOffreUtilisateur", {
      id_utilisateur: JSON.parse(localStorage.getItem("utilisateur")).id_utilisateur
    }).then((result) => { this.setState({ listeOffres: result.data }) });

  };


  affichageNego = (publication) => {
    this.setState({ affichage: true, publicationConsultee: publication });
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
    this.setState({ affichage: false })
  }

  retour2 = () => {
    this.setState({ affichage2: false, affichage: true })
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
             <h1>Messages </h1>

             <button type="submit" value="Retour" class="btn btn-primary" onClick={this.retour2}>Retour</button>

          <div class="fenetreDiscussion  p-5 my-5"> 

          
          {this.state.listeMessage.map((item) => (

          <div class="card">
                
                  
                

               


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
                        
                        <p>{item.id_negocier.utilisateur.prenom_utilisateur}<br/> {item.id_negocier.utilisateur.nom_utilisateur}</p>
                        
                      
                      </div> 
              

               
                    
                      
                    </div>
                     
                    <div class="card-body">
                      
                    
                                         
                      <p> {item.message}</p>
                  
                  </div>
                   
                     
                  
                     
                     
                      
                      

                   <p class="text-end">  {(new Date(item.id_negocier.date)).toLocaleString()} </p>
                  </div>
                 
          
               
            )
            )}
          </div>
         

          <form class="my-5 text-end">
          <textarea type="text" row="7" class="form-control" value={this.state.message} name="message" onChange={this.handleChange}></textarea>
          <input type="submit" value="Actualiser" class="btn btn-primary" onClick={() => this.affichageMessage(this.state.negocier)}></input> 
           
                <input type="submit" class="btn btn-primary" onClick={this.envoyerMessage}></input> 
             </form>
         
        </div>)
    }

    /*Affichage négociation*/
    if (this.state.affichage == true) {
      return (
        <div class="container">
       
          <h1>Interlocuteurs</h1>

          <button type="submit" value="Retour" class="btn btn-primary" onClick={this.retour}>Retour </button>
         
          {this.state.listeNegociations.map((item) => (
             
              <div class="card" onClick={() => this.affichageMessage(item)}> 
                <div class="card-body">
                  <div class="card-subtitle, alignementGauche, gras">#{item.id_negocier.utilisateur.id_utilisateur} <br/></div>
               
               
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
                  
                  <p>{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur}<br/> Statut</p>
                  
                
                </div> 
              

                </div>

               
               
               
                </div>


               

                 
              </div>
             
          )
          )}
        
        </div>)
    }

    /*Premier affichage*/
    return (
      <div class="container-sm">

        <h1>Mes offres</h1>

        <p>Offres / <span class="color-green">Demandes</span></p>

        <button class="btn btn-primary">
          Filtrer
        </button>
        <FormFiltrer></FormFiltrer>
         
          {this.state.listeOffres.map((item) => (
             
              <div class="card offres" onClick={() => this.affichageNego(item)}>
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


               </div>
              </div>
            
            
          )
          )}
         


      </div>
    );

  }

}

export default MesOffres;