import React from "react";

var id_publication;
var titre_publication;

var nom_utilisateur;
var prenom_utilisateur; 


class Negociation extends React.Component {

    constructor() {
        super();
    
        this.state = {
         
        };
      }


      render(){ 
  
        return (
          
            <article class="card negociation">
            
                <div class="card-body">
                <p>#{id_publication}</p>
                <h5 class="card-title">{titre_publication}</h5>
                <p class="card-text">{message}.</p>
                <p><svg src="../img/avatar.svg"></svg>{nom_utilisateur}{prenom_utilisateur}</p>

                </div>
          </article>
                
          );

        }
};

export default Negociation;