import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Connexion extends React.Component {
    /*constructor() {
        super();

        this.state = {
            id: "",
            mdp: ""
        };
    }*/
    /*
    infoConnexion = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    connexion = () => {
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/findUtilisateur", {params: {id:"1"}} );
    }
    */
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
    }

}


export default Connexion;