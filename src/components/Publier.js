import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Publier extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_publication: "",
            description_publication: "",
            prix: "",
            type_produit: "",
            date_publication: "",
            quantite: "",
            utilisateur: {},
            type_publication: {},
            statut_publication: {},
            type_publications: [],
            statut_publications: [],
            sessionTemps: true
        }
    }

    addPublication = (e) => {
        e.preventDefault();
        axios.post("/tender_du_poulet/addPublication", {
            nom_publication: this.state.nom_publication,
            description_publication: this.state.description_publication,
            prix: this.state.prix,
            type_produit: this.state.type_produit,
            date_publication: this.state.date_publication,
            quantite: this.state.quantite,

            utilisateur: this.state.utilisateur,
            type_publication: this.state.type_publication,
            statut_publication: this.state.statut_publication,
            etat_publication: {id_etat_publication : 13}
        });
    }

    afterSubmit = () => {
        this.setState({ nom_publication: "" })
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeSelect = (e) => {
        this.setState({ [e.target.name]: JSON.parse(e.target.value) });
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem("utilisateur"))!=null) {
            this.setState({
                utilisateur: JSON.parse(localStorage.getItem("utilisateur"))
            });
        }
        axios.get("/tender_du_poulet/findAllTypePublication").then((result) => {
            this.setState({ type_publications: result.data });
        });
        axios.get("/tender_du_poulet/findAllStatutPublication").then((result) => {
            this.setState({ statut_publications: result.data });
        });
    }

    render() {
        return (
            <div className="Publier">
                <ul>
                    <h3>Publication</h3>
                    <form onSubmit={this.addPublication}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nom publication</th>
                                    <th>Description publication</th>
                                    <th>Prix</th>
                                    <th>Type produit</th>
                                    <th>Date publication</th>
                                    <th>Quantite</th>
                                    <th>Type publication</th>
                                    <th>Statut publication</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <input type="text" name="nom_publication" value={this.state.nom_publication} onChange={this.handleChange}></input>
                                    </th>
                                    <td>
                                        <input type="text" name="description_publication" value={this.state.description_publication} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="prix" value={this.state.prix} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="type_produit" value={this.state.type_produit} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="date" name="date_publication" value={this.state.date_publication} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <input type="text" name="quantite" value={this.state.quantite} onChange={this.handleChange}></input>
                                    </td>
                                    <td>
                                        <select name="type_publication" onChange={this.handleChangeSelect}>
                                            <option value={JSON.stringify({ type_publication: null })}>Choisir une type publication</option>
                                            {this.state.type_publications.map(item =>
                                                <option value={JSON.stringify(item)}>{item.nom_type_publication}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="statut_publication" onChange={this.handleChangeSelect}>
                                            <option value={JSON.stringify({ statut_publication: null })}>Choisir un statut publication</option>
                                            {this.state.statut_publications.map(item =>
                                                <option value={JSON.stringify(item)}>{item.nom_statut_publication}</option>
                                            )}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit"></input>
                    </form>
                </ul>
            </div>
        )
    }
}

export default Publier;