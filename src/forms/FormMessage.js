import React from "react"; 



class FormMessage extends React.Component {

    constructor() {
        super();
    
        this.state = {
         
        };
      }

      
    
  render(){ 
  
    return (
    
   
        <form>
        <label for="message">Votre message</label>
      <div class="form-group d-flex">
       
        <input type="text" class="w-75  form-control" id="message" placeholder="Enter message"/>
          <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>
       
     
      </form>
           
     
          
           
           
       
      );

    }
    
   };



export default FormMessage;