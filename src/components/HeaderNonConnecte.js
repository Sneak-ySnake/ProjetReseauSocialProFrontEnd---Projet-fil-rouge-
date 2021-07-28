import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import logo from "./img/logo.png";

class HeaderNonConnecte extends React.Component {

    render() {
        return(
            <header className="HeaderNonConnecte">

                <div class="row align-items-center, container-sm" align="right">
                    <div class="col">
                        <a href="/test"><img src={logo} width="50" height="50"/></a>
                    </div>
                    <div class="col">
                       
                    </div>
                    <div class="col">
                        <a href="/connexion"><span className="headerText" >Se connecter  |</span></a>
                        <a href="/inscription"><span className="headerText" > S'inscrire</span></a>
                    </div>
                </div>

            </header>
        );
    }

}

export default HeaderNonConnecte;
