export var creerSession = () => {
    var u = {
        email_utilisateur: this.state.email,
        mot_de_passe_utilisateur: this.state.mdp
    }

    localStorage.setItem("utilisateur", JSON.stringify(u));
};

export var tempsSession = () => {
    var temps = Date.now() + 10000;
    localStorage.setItem("tempsSession", temps);
}