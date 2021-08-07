import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import sha256 from 'js-sha256';

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_type_publication: ""
        };
    }

    

    ajoutTypePublication = (e) => {
        e.preventDefault();
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/ajoutTypePublication", {
            nom_type_publication: this.state.nom_type_publication
        }).then(this.afterSubmit);
    };

    afterSubmit = () => {
        this.setState({nom_type_publication: ""})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        {var testHash = "bonjour";
        var hash = sha256(testHash);}
        return(
            <div className="Home">
                Home

                <form onSubmit={this.ajoutTypePublication}>
                    <input type="text" onChange={this.handleChange} name="nom_type_publication" value={this.state.nom_type_publication}></input>
                    <input class="btn btn-primary" type="submit"></input>
                </form>
                
                Normal : {testHash}<br/>
                Hash : {hash}
            </div>
        );
    }

}

export default Home;