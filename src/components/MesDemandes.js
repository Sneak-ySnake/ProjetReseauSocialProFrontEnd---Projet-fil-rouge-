import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class MesDemandes extends React.Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  componentDidMount() {
    
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
      alert("Pas de session en cours, veuillez vous connecter")
      return <Redirect to="/home" />;
    }
    else if (Date.now() > tempsSession) {
      this.setState({sessionTemps: false});
      alert("session expirée");
      localStorage.clear();
      return <Redirect to="/home" />;
    }
    if (this.state.sessionTemps == true) {
      var temps = Date.now() + 1800*1000;
      localStorage.setItem("tempsSession", temps);
    }

    return (
      <div className="MesDemandes">
       
        
        
      </div>
    );
  }

}

export default MesDemandes;