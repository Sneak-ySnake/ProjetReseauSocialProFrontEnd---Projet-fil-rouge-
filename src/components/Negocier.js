import React from "react";

var id_negocier;
var id_publication;
var nom_publication;
var message;

var nom_utilisateur;
var prenom_utilisateur; 


class Negocier extends React.Component {

    constructor() {
        super();
    
        this.state = {
         
        };
      }


      render(){ 
  
        return (
          
            <article class="card negocier">
            
                <div class="card-body">
                <p>#{id_negocier}</p>
                <p><svg src="../img/avatar.svg"></svg>{nom_utilisateur}{prenom_utilisateur}</p>
                 <p class="card-text">{message}.</p>
                

                </div>
          </article>
                
          );

        }
};

export default Negociation;