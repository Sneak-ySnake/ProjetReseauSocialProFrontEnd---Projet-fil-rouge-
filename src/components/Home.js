import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_type_publication: ""
        };
    }

    

    ajoutTypePublication = (e) => {
        e.preventDefault();
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/ajoutTypePublication", {
            nom_type_publication: this.state.nom_type_publication
        }).then(this.afterSubmit);
    };

    afterSubmit = () => {
        this.setState({nom_type_publication: ""})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        {var u = JSON.parse(localStorage.getItem("utilisateur"));
        var tempsSession = localStorage.getItem("tempsSession");}
        if (u == null) {
            return <Redirect to="/" />;
        }
        if (Date.now() > tempsSession) {
            localStorage.clear();
            return <Redirect to="/" />;
        }
        return(
            <div className="Home">
                Home

                <form onSubmit={this.ajoutTypePublication}>
                    <input type="text" onChange={this.handleChange} name="nom_type_publication" value={this.state.nom_type_publication}></input>
                    <input class="btn btn-primary" type="submit"></input>
                </form>
                
                {u.nom_utilisateur} <br/>
                {u.email_utilisateur} <br/>
                {u.mot_de_passe_utilisateur}<br/>
                {tempsSession}
            </div>
        );
    }

}

export default Home;