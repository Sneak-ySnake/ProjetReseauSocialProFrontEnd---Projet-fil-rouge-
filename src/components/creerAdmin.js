import React from "react";
import axios from "axios";

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            mail_admin: "",
            mot_de_passe_admin: "",
            telephone: "",
            num_voie_admin: "",
            adresse_admin: "",
            complement_adresse_admin: "",
            id_ville: ""
        }
    }

    creerAdmin = () => {
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/creerAdmin", {
            mail_admin: this.state.mail_admin,
            mot_de_passe_admin: this.state.mot_de_passe_admin,
            telephone: this.state.telephone,
            num_voie_admin: this.state.num_voie_admin,
            adresse_admin: this.state.adresse_admin,
            complement_adresse_admin: this.state.complement_adresse_admin,
            id_ville: this.state.id_ville
        });
    };

    render() {
        return (
            <div className = "creerAdmin">
            <form onSubmit={this.creerAdmin()}>
                <h3> Creer admin</h3>
                <div class="container"></div>
                <div class="row">
                    <div class="col-8">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
                        </div>
                        <div class="col-4">Value</div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-8">Mot de passe</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">Mot de passe 2</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">Téléphone</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">numéro de voie</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">numéro de voie</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">adresse</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">complément adresse</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <div class="row">
                        <div class="col-8">Ville</div>
                        <div class="col-4">
                            <input></input>
                        </div>
                        <br></br>
                    </div>
                    <button type="submit" color="blue">Créer Administrateur</button>
                </div>
            </form>    
            </div>
        );
    }

}

export default creerAdmin;