import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";


class AdministrerUtilisateur extends React.Component {
    constructor() {
        super();
        this.state = {
            id_admin : "",
            id_action_sur_utilisateur:"",
            actionsUtilisateur : [],
            id_utilisateur : "",
            date_action_sur_utilisateur :"",
        }
    }

    addAdministrerUtilisateur =(e) => {
        e.preventDefault();
        
        /*var dateAction = new Date();
        var moisAction = dateAction.getMonth() +1
        if (moisAction < 10) {
            moisAction ="0"+ moisAction
        }
        alert(JSON.stringtify(1));
        alert(JSON.stringify(2 + " " + this.state.id_admin + " " + this.state.id_action_sur_utilisateur + " " 
        + this.state.id_utilisateur + " " + this.state.date_action_sur_utilisateur.getFullYear() ));
        //alert(JSON.stringify(25 + " " + this.state.prix));*/



        axios.post("/tender_du_poulet/addAdministrerUtilisateur", {
            admin : {id_admin: this.state.id_admin},
            action_sur_utilisateur : {id_action_sur_utilisateur: this.state.id_action_sur_utilisateur},
            utilisateur : {id_utilisateur: this.state.id_utilisateur},
            date_action_sur_utilisateur: Date.now()
        });

        if (this.state.id_action_sur_utilisateur === 1) {
            axios.post("/tender_du_poulet/deleteUtilisateur", {
            id_utilisateur : this.state.id_utilisateur
            });
        }
        
    }



    /*
    afterSubmit =() => {
        this.setState({})
    }
    */
   handleChange =(e) => {
       this.setState({ [e.target.name] : (e.target.value) });
   }

   handleChangeSelect = (e) => {
       this.setState({ [e.target.name]: JSON.parse(e.target.value) });
   }



   componentDidMount() {
       axios.get("/tender_du_poulet/findAllActionSurUtilisateur").then((result) => {
            this.setState({actionsUtilisateur: result.data});
       });
       axios.get("/tender_du_poulet/findAllUtilisateur").then((result) => {
           this.setState({utilisateurs: result.data});
       }); 
   }

   render() {
       /*Verif session*/
    /*{
        var u = JSON.parse(localStorage.getItem("administrateur"));
        var tempsSession = localStorage.getItem("tempsSession");
      }
      if (u === null) {
        alert("Pas de session en cours, veuillez vous connecter")
        return <Redirect to="/connexionAdmin" />;
      }
      else if (Date.now() > tempsSession) {
        this.setState({ sessionTemps: false });
        alert("session expirée");
        localStorage.clear();
        return <Redirect to="/connexionAdmin" />;
      }
      if (this.state.sessionTemps === true) {
        var temps = Date.now() + 1800 * 1000;
        localStorage.setItem("tempsSession", temps);
      }
      */
       return (
           <div classname="AdministrerUtilisateur">
                   <h3> Administrer Utilisateur</h3>
                   <form onsubmit={this.addAdministrerUtilisateur}>
                        <table class= "table">
                            <thead>
                                <tr>
                                    <th>Action sur utilisateur</th>
                                    <th>Id Utilisateur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <select name ="id_action_sur_utilisateur" onChange={this.handleChange}>
                                            {this.state.actionsUtilisateur.map(item =>
                                                <option value = {item.id_action_sur_utilisateur}>{item.nom_action_sur_utilisateur}</option>
                                            )}
                                        </select>
                                    </th>
                                    <th>
                                        <input type="number" name="id_utilisateur" value={this.state.id_utilisateur} onChange={this.handleChange}></input>
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
export default AdministrerUtilisateur;