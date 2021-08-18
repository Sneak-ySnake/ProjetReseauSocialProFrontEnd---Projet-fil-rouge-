import React from "react";
import { Link, withRouter } from "react-router-dom";

function Footer(props) {
    return (
        <div className="footer" id="footer">
            <footer class="bg-dark text-center text-white">
                <div class="container p-4 pb-0">
                    <section class="mb-4">
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/MentionLegal">
                            MentionLegal
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/CDU">
                        CDU
                        </Link>

                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/PolitiqueCookies">
                            PolitiqueCookies
                        </Link>

                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/FAQ">
                            FAQ
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/NousContacter">
                            NousContacter
                        </Link>
                        
                        <Link class="btn btn-outline-light btn-floating m-1" href="#!" to="/Support">
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

export default withRouter(Footer);
