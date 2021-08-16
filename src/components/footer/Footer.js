import React from "react";
import { Link, withRouter } from "react-router-dom";

function Footer(props) {
    return (
        <div className="footer">
            <footer class="py-5 bg-dark">
                <nav class="navbar navbar-expand navbar-dark bg-dark">
                    <div class="container">
                        <div>
                            <ul class="navbar-nav ml-auto">
                                <li>
                                <Link class="nav-link" to="/MentionLegal">
                                    MentionLegal
                                </Link>
                                </li>
                                
                                <li
                                    class={`nav-item  ${
                                    props.location.pathname === "/CDU" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/CDU">
                                CDU
                                </Link>
                                </li>

                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/PolitiqueCookies" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/PolitiqueCookies">
                                    PolitiqueCookies
                                </Link>
                                </li>
                                
                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/FAQ" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/FAQ">
                                    FAQ
                                </Link>
                                </li>
                                
                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/NousContacter" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/NousContacter">
                                    NousContacter
                                </Link>
                                </li>

                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/Support" ? "active" : ""
                                }`}
                                >
                                <Link class="nav-link" to="/Support">
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

export default withRouter(Footer);
