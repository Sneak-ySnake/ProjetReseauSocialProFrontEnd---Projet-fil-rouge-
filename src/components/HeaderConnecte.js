import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "./img/logo.svg";

function HeaderConnecte(props) {
  return (
    <div className="HeaderConnecte">
      <nav class="navbar navbar-expand navbar-dark bg-green">
        <div class="container">
          
            <Link class="navbar-brand" to="/Marche">
            <img
                class="logo "
                src={logo} 
                height={40} width={40}
                alt=""
                />  Tender
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
