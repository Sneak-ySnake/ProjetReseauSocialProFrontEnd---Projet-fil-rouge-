import React from "react";

function Profil() {
  return (
    <div className="Profil">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={require("./img/logo.png")}
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Profil</h1>
            <p>
            OuiControle est membre du groupe SGS, leader mondial de l’inspection, du contrôle, de l’analyse et de la certification. SGS intervient dans de nombreux secteurs d’activité comme l’industrie, l’agriculture, la pharmacie, le commerce international, l’automobile…
            En France, SGS est n°1 du contrôle technique automobile.
            En choisissant Auto Sécurité et le groupe SGS, vous bénéficiez donc d’un savoir-faire reconnu et d’un service de qualité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;