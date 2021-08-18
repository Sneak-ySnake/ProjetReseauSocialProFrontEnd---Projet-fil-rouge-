import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import logo from "./img/logo.png";
import { Link, withRouter } from "react-router-dom";

function HeaderNonConnecte(props) {
    return (
        <div className="HeaderNonConnecte">
            <nav class="navbar navbar-expand">
                <div class="container">
                    <div>
                        <img
                            class="img-fluid "
                            src={logo} width="50" height="50"
                            height={100} width={90}
                            alt=""
                        />
                    </div>
                    <Link class="navbar-brand, headerText" to="/">
                        Tender
                    </Link>
                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li>
                                <Link class="nav-link" to="/connexion">
                                    Se connecter 
                                </Link>
                            </li>

                            <li
                                class={`nav-item  ${props.location.pathname === "/inscription" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/inscription">
                                    S'inscrire
                                </Link>
                            </li>              
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}


/*
class HeaderNonConnecte extends React.Component {

    render(props) {
        return (
            <header className="HeaderNonConnecte">

                <div class="row align-items-center, container-sm" align="right">
                    <div class="col">
                        <a href="/test"><img src={logo} width="50" height="50" /></a>
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
*/
export default withRouter(HeaderNonConnecte);
