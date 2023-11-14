import React from "react";
import { render } from "react-dom";
import "../BoxId.css"
import axios from "axios";
import jwtDecode from "jwt-decode";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    // Initialisation de l'état du composant
    this.state = {
      userName: "",
      password: null, // Propriété pour stocker le mot de passe
    };
  }

  componentDidMount() {
    // Effectuer une requête GET au montage du composant pour tester l'authentification
    axios.get('https://api-studi-b69c1cb02fce.herokuapp.com/auth')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête');
      });
  }

  // Gestionnaire de changement pour le champ nom d'utilisateur
  handleUsernameChange = (event) => {
    this.setState({ userName: event.target.value });
  }  

  // Gestionnaire de soumission du formulaire
  handleSubmit = (event) => {
    event.preventDefault();
    
    // Effectuer une requête POST pour l'authentification
    axios.post('http://localhost:3001/login', {
      nom_utilisateur: this.state.userName,
      mot_de_passe: this.state.password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
        // Redirection de l'utilisateur en cas de succès
        const redirectUrl = `/Admin?username=${this.state.userName}`;
        window.location.href = redirectUrl;
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  }

  // Gestionnaire de changement pour le champ mot de passe
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    const { userName, password } = this.state;

    return (
      <div className="Id">
        {/* Formulaire d'authentification */}
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="username" style={{margin:'auto'}}>{this.props.title} :</label>
          <input type="text" id="username" name="username" value={userName} onChange={this.handleUsernameChange} placeholder="" />
          <label htmlFor="password" style={{margin:'auto'}}>{this.props.title2}</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handlePasswordChange}/>
          <input type="submit" value="Se connecter"/>
        </form>
      </div>
    );
  }
}

// Valeurs par défaut des propriétés
AuthPage.defaultProps = {
  title: 'Username',
  title2: 'Password',
};

export default AuthPage;






