import React from "react"; 

class FormFiltrer extends React.Component {

    constructor() {
        super();
    
        this.state = {
         
        };
      }

      
    
  render(){ 
  
    return (
    
    <div class="formFiltrer"> 
                 <h3>Filtrer</h3>
              <form>

              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label" for="flexCheckDefault">
                Publique
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
              <label class="form-check-label" for="flexCheckChecked">
               Privée
              </label>
            </div>
       <h3>Mots clés</h3>
        <div class="form-group">
          <label for="motcles">Mots clés</label>
          <input type="text" class="form-control" id="motcles" aria-describedby="motsclesHelp" placeholder="recherche de mots clés"/>
         
        </div>
      <h3>Tags</h3>

      <fieldset>

        <div class="form-group">
          <label for="tags">Tags</label>
          <input type="text" class="form-control" id="tags" placeholder="tags"/>
        </div>

        <div class="form-group">
          <label for="tagsrecherches">Tags Recherchés</label> 
          <p>
          <button type="button" class="btn btn-primary btn-sm">Small button</button>
          <button type="button" class="btn btn-primary btn-sm">Small button</button>
          <button type="button" class="btn btn-primary btn-sm">Small button</button>
          <button type="button" class="btn btn-primary btn-sm">Small button</button>
          <button type="button" class="btn btn-primary btn-sm">Small button</button>
          </p>
        </div>
        

        </fieldset>

        <fieldset>
          <h3>Zone géographique</h3>
          <label for="zone">Zone</label> 

          <select class="form-select" aria-label="Default select ville">
          <option selected>Ville</option>
          <option value="1">Ville1</option>
          <option value="2">Ville2</option>
          <option value="3">Ville3</option>
          </select>

        </fieldset>


        <button type="submit" class="btn btn-primary">Envoyer</button>
      </form>
            
          
      </div>  
           
       
      );

    }
    
   };



export default FormFiltrer;