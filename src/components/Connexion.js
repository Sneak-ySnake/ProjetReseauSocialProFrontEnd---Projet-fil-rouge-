import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";

class Connexion extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            mdp: "",
            redirection: false
        };
    }

    connexion = (e) => {
        e.preventDefault();
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/login", {
            email_utilisateur: this.state.email,
            mot_de_passe_utilisateur: this.state.mdp
        }).then((result) => {
            if(result.data==true) {
                this.setState({redirection: true});
            }    
            else {
                alert("Erreur");
            }
        });
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        if(this.state.redirection==true) {
           return <Redirect to="/home"/>;
        }
        return(
            <div className="Connexion">
                <form onSubmit={this.connexion}>
                    <br/>
                    Email :
                    <br/>
                    <input type="text" name="email" onChange={this.handleChange}></input>
                    <br/>
                    Mot de passe :
                    <br/>
                    <input type="password" name="mdp" onChange={this.handleChange}></input>
                    <br/>
                    <input class="btn btn-primary" type="submit"></input>
                </form>
            </div>
            
        );
    };

/*
    render() {
        return(
            <div className="Connexion">
                <form action="/PROJET_FIL_ROUGE_tender_du_poulet/login" method="post">
                    <br/>
                    Email :
                    <br/>
                    <input type="text" name="email"></input>
                    <br/>
                    Mot de passe :
                    <br/>
                    <input type="password" name="mdp"></input>
                    <br/>
                    <input class="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    };
*/
}


export default Connexion;