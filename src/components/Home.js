import React from "react";
import axios from "axios";

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            nom_type_publication: ""
        };
    }

    ajoutTypePublication = () => {
        axios.post("/PROJET_FIL_ROUGE_tender_du_poulet/ajoutTypePublication", {
            nom_type_publication: this.state.nom_type_publication
        });
    };

    changement = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return(
            <div className="Home">
                Home

                <form onChange={(e) => this.changement(e)} onSubmit={this.ajoutTypePublication()}>
                    <input type="text" name="nom_type_publication"></input>
                    <input type="submit"></input>
                </form>

            </div>
        );
    }

}


export default Home;