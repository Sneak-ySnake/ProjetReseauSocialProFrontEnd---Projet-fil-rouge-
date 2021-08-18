import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import profil from "./img/profil.svg";
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
    this.setState({ message: "" });

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  retour = () => {
    this.setState({ affichage: false });
  };

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
    if (this.state.affichage == true) {
      return (
        <div class="container">
            <h1>Messages</h1>

            <button type="submit" value="Retour" class="btn btn-primary" onClick={this.retour}>Retour</button>
          <div class="fenetreDiscussion p-5">
 
             
           {/*  <table>
              
              
              <br />
              {this.state.listeMessages.map((item) => (
                <tbody>
                  <tr class="alignementGauche">
                    <span class="gras">{item.id_negocier.utilisateur.prenom_utilisateur} {item.id_negocier.utilisateur.nom_utilisateur} | {(new Date(item.id_negocier.date)).toLocaleString()}</span>
                    <br />{item.message}
                  </tr>
                  <br /><br />
                </tbody>
              )
              )}
            </table> */}


           
              
              
              
              {this.state.listeMessages.map((item) => (
               
                  <div class="card">

                <div class="row align-items-start">
                    <div class="col">


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

                    
                      
                    </div>
                    <div class="col">
                    <div class="card-body">
                      
                    
                                         
                      <p> {item.message}</p>
                  
                  </div>
                    </div>
                     
                  </div>
                     
                     
                      
                      

                   <p class="text-end">  {(new Date(item.id_negocier.date)).toLocaleString()} </p>
                  </div>
                 
                 
              )
              )}
           
        

          </div>
          <form>
          <input type="text" class="form-control" value={this.state.message} name="message" onChange={this.handleChange}></input>
             
                <input type="submit" class="btn btn-primary" onClick={this.envoyerMessage}></input> 
              <input type="submit" value="Actualiser" class="btn btn-primary" onClick={() => this.affichageMessage(this.state.negocier)}></input> 
           </form>
        </div>)
    }

    /*Premier affichage*/
    return (
      <div className="container-sm">
       <h1>Négociations</h1>
        
          {this.state.listeNegociations.map((item) => (
            
              <div class="card negociations" onClick={() => this.affichageMessage(item)}>
                <div class="card-body">
                  <p>#{item.id_negocier.publication.id_publication}</p>
                  <h3>{item.id_negocier.publication.nom_publication}</h3> 

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
                    Date : {new Date(item.id_negocier.publication.date_publication).toLocaleDateString()}<br />
                  </div>  */}
                </div>
              </div>
             
            
          )
          )}
        


      </div>
    );

  }

}

export default Negociations;