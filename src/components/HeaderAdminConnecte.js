import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "./img/logo.png";

function HeaderAdminConnecte(props) {
  return (
    <div className="HeaderAdminConnecte">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
            <div>
                <img
                class="img-fluid "
                src={logo} width="50" height="50"
                height={100} width={90}
                alt=""
                />
            </div>
            <Link class="navbar-brand" to="/AdministrerUtilisateur">
                Tender
            </Link>
            <div>
                <ul class="navbar-nav ml-auto">
                    <li>
                    <Link class="nav-link" to="/AdministrerUtilisateur">
                        Administrer Utilisateur01
                    </Link>
                    </li>

                    <li>
                    <Link class="nav-link" to="/AdministrerPublication">
                        Administrer Publication01
                    </Link>
                    </li>
                    
                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/creerAdmin" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/creerAdmin">
                        Creer Administrateur
                    </Link>
                    </li>

                    
                    <Link class="nav-link" to="/Deconnexion">
                        Deconnexion
                    </Link>
                </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(HeaderAdminConnecte);