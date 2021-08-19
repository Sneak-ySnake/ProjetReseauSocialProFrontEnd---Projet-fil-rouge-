import React from "react";
import { Link, withRouter } from "react-router-dom";

function FooterConnect(props) {
    return (
        <div className="footer" id="footerConnecter">
            <footer class="  bg-green text-center text-white">
                <div class="container p-4 pb-0">
                    <section class="mb-4">
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/MentionLegalConnect">
                            Mention Légal
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/CDUConnect">
                        Condition Géréral d'Utilisation
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/PolitiqueCookiesConnect">
                            Politique Cookies
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/FAQConnect">
                            FAQ
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/NousContacterConnect">
                            Nous Contacter
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/SupportConnect">
                            Support
                        </Link>
                    </section>
                </div>
                <div class="container copyright">
                    <p class="m-0 text-center text-white">
                        Copyright &copy; CDA 2021
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default withRouter(FooterConnect);
