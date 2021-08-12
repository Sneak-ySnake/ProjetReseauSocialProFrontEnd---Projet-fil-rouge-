import React from "react";
import Negociation from "./Negociation";



class Interlocuteurs extends React.Component {

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
          <Negocier></Negocier>
          </div>
          <div class="col">
          <Negocier></Negocier>
          </div>
          <div class="col">
          <Negocier></Negocier>
          </div>
        </div>
    </div>
          
           
           
       
      );

    }
    
   };



export default Interlocuteurs;