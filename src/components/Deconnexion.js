import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Deconnexion extends React.Component {

    deconnexion = () => {
        localStorage.clear();
    }

  render() {
    {
      var u = JSON.parse(localStorage.getItem("utilisateur"));
      var tempsSession = localStorage.getItem("tempsSession");
    }
    if (u == null) {
      return <Redirect to="/" />;
    }
    if (Date.now() > tempsSession) {
      localStorage.clear();
      return <Redirect to="/" />;
    }
    {this.deconnexion();}
    return (
      <div className="Deconnexion">

        <br/>
        Déconnexion terminée.

      </div>
    );
  }

}

export default Deconnexion;