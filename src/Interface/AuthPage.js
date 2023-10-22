import React from "react";
import { render } from "react-dom";
import "../BoxId.css"
import axios from "axios";
import jwtDecode from "jwt-decode";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: null, // Nouvelle propriété pour stocker le token
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/auth')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête');
      });
  }


  handleUsernameChange = (event) => {
    this.setState({ userName: event.target.value });
  }  

  // changement d'information pour le nom de l'utilisateur et le mdp
  handleSubmit = async (event) => {
    event.preventDefault();
    const user = event.target.username.value;
    const pwrd = event.target.password.value;

    console.log("Nom d'utilisateur:", user);
    console.log("Mot de passe:", pwrd);

  
    // Envoyer une requête POST à l' API
    axios.post('http://localhost:3001/api/user', {
      userName: user,
      password: pwrd,
    })
    .then(response => {
      // Vérifier la réponse de l'API ici
      const utilisateurs = response.data; 
      // Vérifier si le nom d'utilisateur et le mot de passe correspondent à un utilisateur dans la liste
      const utilisateurTrouve = utilisateurs.find(utilisateur => {
      return utilisateur.nom_utilisateur === user && utilisateur.mot_de_passe === pwrd;
  });
        if (utilisateurTrouve) {
        console.log('Authentification réussie !');
        } else {
        console.log('Authentification échouée.');
        }
    })
    .catch(error => {
      console.error('Erreur lors de l\'authentification :', error);
    });
  }
  

  render() {
    const { userName } = this.state;
    const {password} = this.state

    return (
      <div className="Id">
     
        <h2>{userName}</h2>
     
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="username">{this.props.title} :</label>
          <input type="text" id="username" name="username" value={userName} onChange={this.handleUsernameChange} placeholder="" />
          <label htmlFor="password">{this.props.title2}</label>
          <input type="password" id="password" name="password" value={password}/>
          <input type="submit" value="Se connecter"/>
        </form>
      </div>
    );
  }
}

AuthPage.defaultProps = {
  title: 'Username',
  title2: 'Password',
}

export default AuthPage;






