import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

class AdministrerPublication extends React.Component {
    constructor() {
        super();
        this.state = {
            id_admin : "",
            id_action_sur_publication:"",
            actionsPublication : [],
            id_publication : "",
            date_action_sur_publication :"",
        }
    }

    addAdministrerPublication = (e) =>{
        e.preventDefault();
    

        axios.post("/tender_du_poulet/addAdministrerPublication", {
        admin : {id_admin:this.state.id_admin},
        action_sur_publication :{id_action_sur_publication : this.state.id_action_sur_publication},
        publication : {id_publication : this.state.id_publication},
        date_action_sur_utilisateur: Date.now()
        });

        if (this.state.id_action_sur_publication === 1) {
        axios.post("/tender_du_poulet/deletePublication", {
        id_publication : this.state.id_publication
        });
        }
    }

    handleChange=(e) => {
        this.setState({ [e.target.name] : (e.target.value) });
    }

    componentDidMount() {
        axios.get("/tender_du_poulet/findAllActionSurPublication").then((results) => {
            this.setState({actionsPublication : results.data});
        });
        axios.get("/tender_du_poulet/findAllPublication").then((result) => {
            this.setState({publications: result.data});
        })
    }

    render() {
         /*Verif session*/
    /*{
        var u = JSON.parse(localStorage.getItem("administrateur"));
        var tempsSession = localStorage.getItem("tempsSession");
      }
      if (u == null) {
        alert("Pas de session en cours, veuillez vous connecter")
        return <Redirect to="/connexionAdmin" />;
      }
      else if (Date.now() > tempsSession) {
        this.setState({ sessionTemps: false });
        alert("session expirée");
        localStorage.clear();
        return <Redirect to="/connexionAdmin" />;
      }P
      if (this.state.sessionTemps == true) {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
      }*/
        return (
            <div classname = "AdministrerPublication">
                <h3> Administrer Publication</h3>
                   <form onsubmit={this.addAdministrerUPublication}>
                        <table class= "table">
                            <thead>
                                <tr>
                                    <th>Action sur publication</th>
                                    <th>Id Publication</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <select name ="id_action_sur_publication" onChange={this.handleChange}>
                                            {this.state.actionsPublication.map(item =>
                                                <option value = {item.id_action_sur_publication}>{item.nom_action_sur_publication}</option>
                                            )}
                                        </select>
                                    </th>
                                    <th>
                                        <input type="number" name="id_publication" value={this.state.id_publication} onChange={this.handleChange}></input>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit"></input>    
                    </form> 
                </div>   
        );
    };      
}
export default AdministrerPublication;
            