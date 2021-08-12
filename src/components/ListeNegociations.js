import React from "react";

 

class ListeNegociations extends React.Component {
  
  constructor() {
    super();

    this.state = {
     
    };
  } 
    
  render(){ 
  
    return (
    
    
    <div class="container">
        <div class="row">
          <div class="col">
          <Negociation></Negociation>
          </div>
          <div class="col">
          <Negociation></Negociation>
          </div>
          <div class="col">
          <Negociation></Negociation>
          </div>
        </div>
    </div> 
       
      );

    }

 };
 
 export default ListeNegociations;