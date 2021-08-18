import React from "react";
import axios from "axios";
import { Redirect , Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
 

class Deconnexion extends React.Component {

  constructor() {
    super();

    this.state = { 
        redirection: false
    };
}
    redirection = () => {
      this.setState({
      redirection :true

      })



    }
    deconnexion = () => {
        localStorage.clear();
    }

  render() {
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
    }
    if (u == null) {
      return <Redirect to="/" />;
    }
    if (this.state.redirection == true) {
      return <Redirect to="/" />;
    }

    {this.deconnexion();}
    return (
      <div className="Deconnexion">


  <h1>Deconnexion</h1>
      <div class="card " id="connexionForm">
        
      <p>Déconnexion terminée.</p>

      <button class="btn btn-primary" onClick={this.redirection}>Revenir à l'accueil</button> 

      </div> 

      </div>
    );
  }

}

export default Deconnexion;