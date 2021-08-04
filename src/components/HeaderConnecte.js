import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "./img/logo.png";

function HeaderConnecte(props) {
  return (
    <div className="HeaderConnecte">
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
            <Link class="navbar-brand" to="/Publier">
                Tender
            </Link>
            <div>
                <ul class="navbar-nav ml-auto">
                    <li>
                    <Link class="nav-link" to="/Publier">
                        Publier
                    </Link>
                    </li>
                    
                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/Negociations" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/Negociations">
                        Negociations
                    </Link>
                    </li>

                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/Profil" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/Profil">
                        Profil
                    </Link>
                    </li>
                    
                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/Marche" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/Marche">
                        Marche
                    </Link>
                    </li>
                    
                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/MesPublications" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/MesPublications">
                        MesPublications
                    </Link>
                    </li>

                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/MesDemandes" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/MesDemandes">
                        MesDemandes
                    </Link>
                    </li>

                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/MesOffres" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/MesOffres">
                        MesOffres
                    </Link>
                    </li>

                    <li
                    class={`nav-item  ${
                        props.location.pathname === "/Deconnexion" ? "active" : ""
                    }`}
                    >
                    <Link class="nav-link" to="/Deconnexion">
                        Deconnexion
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(HeaderConnecte);
