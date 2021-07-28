import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import logo from "./img/logo.png";

class HeaderNonConnecte extends React.Component {

    render() {
        return(
            <header className="HeaderNonConnecte">
               
                <div className="container-sm">
                    <img src={logo} width="50" height="50" align="left"></img>

                    <span className="headerText" align="right">S'inscrire</span>
                </div>

            </header>
        );
    }

}

export default HeaderNonConnecte;
