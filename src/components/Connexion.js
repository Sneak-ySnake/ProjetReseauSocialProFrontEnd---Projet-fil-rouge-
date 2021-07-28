import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Connexion extends React.Component {
    constructor() {
        super();

        this.state = {
            id: "",
            mdp: ""
        };
    }

    render() {
        return(
            <div className="Connexion">
                <form>
                    <br/>
                    Email :
                    <br/>
                    <input type="text" name="id"></input>
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