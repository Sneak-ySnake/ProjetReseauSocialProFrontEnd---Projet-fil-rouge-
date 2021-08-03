import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        });
    };
/*
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target[0].value})
    };
*/
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return(
            <div className="Home">
                Home

                <form onSubmit={(e) => this.ajoutTypePublication(e)}>
                    <input type="text" onChange={(e) => this.handleChange(e)} name="nom_type_publication"></input>
                    <input class="btn btn-primary" type="submit"></input>
                </form>

            </div>
        );
    }

}


export default Home;