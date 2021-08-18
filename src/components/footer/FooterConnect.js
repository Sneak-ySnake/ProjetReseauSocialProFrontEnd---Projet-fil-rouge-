import React from "react";
import { Link, withRouter } from "react-router-dom";

function FooterConnect(props) {
    return (
        <div className="footer">
            <footer class="py-5 bg-dark">
                <nav class="navbar navbar-expand navbar-dark bg-dark">
                    <div class="container">
                        <div>
                            <ul class="navbar-nav ml-auto">
                                <li>
                                <Link class="nav-link" to="/MentionLegalConnect">
                                    Mention Légal
                                </Link>
                                </li>
                                
                                <li
                                    class={`nav-item  ${
                                    props.location.pathname === "/CDUConnect" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/CDUConnect">
                                Condition Géréral d'Utilisation
                                </Link>
                                </li>

                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/PolitiqueCookiesConnect" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/PolitiqueCookiesConnect">
                                    Politique Cookies
                                </Link>
                                </li>
                                
                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/FAQConnect" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/FAQConnect">
                                    FAQ
                                </Link>
                                </li>
                                
                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/NousContacterConnect" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/NousContacterConnect">
                                    Nous Contacter
                                </Link>
                                </li>

                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/SupportConnect" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/SupportConnect">
                                    Support
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container">
                    <p class="m-0 text-center text-white">
                        Copyright &copy; CDA 2021
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default withRouter(FooterConnect);
