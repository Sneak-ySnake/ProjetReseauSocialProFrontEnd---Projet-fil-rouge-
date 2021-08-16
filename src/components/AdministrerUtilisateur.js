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
            id_utilisateur : "",
            date_action_sur_utilisateur :"",
        }
    }

    addAdministrateur =(e) => {
        e.preventDefault();
        var dateAction = new Date();
        var moisAction = dateAction.getMonth() +1;
        if (moisAction < 10) {
            moisAction ="0"+ moisAction
        }
        alert(JSON.stringtify(1));
        alert(JSON.stringify(2 + " " + this.state.id_admin + " " + this.state.id_action_sur_utilisateur + " " 
        + this.state.id_utilisateur + " " + laDate.getFullYear() ));
        //alert(JSON.stringify(25 + " " + this.state.prix));



        axios.post("/tender_du_poulet/addAdmin", {
            id_admin: this.state.id_admin,
            id_action_sur_utilisateur: this.state.id_action_sur_utilisateur,
            id_utilisateur: this.state.id_utilisateur,
            date_action_sur_utilisateur: dateAction.getFullYear() + "-" + moisAction + "-" + dateAction.getDate(),
        });
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


       axios.get(":tender_du_poulet/findAllActionSurUtilisateur").then((result) => {
            this.setState({actionsUtilisateur: result.data});
       });
       axios.get(":tender_du_poulet/findAllUtilisateur").then((result) => {
           this.setState({utilisteurs: result.data});
       });
       axios.get("tender_du_poulet/findAllAdmin").then((result) => {
           this.setState({admins: result.data});
       }); 
   }

   render() {
       return (
           <div classname="CreerAdmin">
               <ul>
                   <h3> Creer administrateur</h3>
                   <form onsubmit={this.addAdministrateur}>
                        <table class= "table">
                            <thead>
                                <tr>
                                    <th>Id admin</th>
                                    <th>Action sur utilisateur</th>
                                    <th>Id Utilisateur</th>
                                    <th>Date </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <input type="text" name="id_admin" value={this.state.id_admin} onChange={this.handleChange}></input> 
                                    </th>
                                    <th>
                                        <input type="text" name="id_action_sur_utilisateur" value={this.state.id_action_sur_utilisateur} onChange={this.handleChange}></input>
                                    </th>
                                    <th>
                                        <input type="text" name="id_utilisateur" value={this.state.id_utilisateur} onChange={this.handleChange}></input>
                                    </th>


                                </tr>
                            </tbody>

                        </table>
                        <input type="submit"></input>    
                    <form/>
               </ul>
            </div>
       )
   }   
}

export default AdministrerUtilisateur;