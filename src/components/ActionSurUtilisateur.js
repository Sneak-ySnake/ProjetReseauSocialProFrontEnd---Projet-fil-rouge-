import React from "react";
import axios from "axios";

class ActionSurUtilisateur extends React.Component {
    constructor() {
        super();
        this.state = {
            nom_action_sur_utilisateur = "",
            redirection : false
        }
    }

    creerActionSurUtilisateur = (e) =>{
        e.preventDefault();
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/creerActionSurUtilisateur", {
            nom_action_sur_utilisateur : this.state.nom_action_sur_utilisateur,
        }).then((result)=> {
            if (result.data == true) {
                this.creerSession();
                this.setState({redirection: true});
            }
            else {
                alert ("erreur");
            }
        });
    };

    /// voir avec Theo  a quoi sert exactement le handlechange////
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    creerSession = () => {
        var s = {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: this.state.mot_de_passe_admin,
        }
        localStorage.setItem("administrateur", JSON.stringify(s));
    };

    render() {
        if (this.state.redirection ==true) {
            return<Redirect to = "/test"/>;
        }
        return (<div className = "creerActionSurUtilisateur">
            <form onSubmit = {this.creerActionSurUtilisateur()}>

            </form>
        </div>);
    }



}