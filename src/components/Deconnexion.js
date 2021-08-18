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
    }
    if (u == null) {
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