import React from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export const gestionSession = (u, tempsSession, sessionTemps) => {
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
    if (sessionTemps == true) {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
    }
}