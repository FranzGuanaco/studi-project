import React from "react";
import { render } from "react-dom";
import "../BoxId.css"
import jwtDecode from "jwt-decode";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      authToken: null, // Nouvelle propriété pour stocker le token
    };
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      userName: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userName } = this.state;

    // Récupérer le mot de passe du formulaire
    const password = event.target.password.value;

    // Envoyer les informations de connexion au serveur
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password }),
      });

      if (response.ok) {
        try {
          const data = await response.json();
          
          const authToken = data.token; // Supposons que le token est retourné par le serveur
          
          this.setState({ userName}, () => {
            console.log("État mis à jour avec le nom d'utilisateur :", this.state.userName);
            
            const decodeToken = jwtDecode(authToken)
            // Construire l'URL avec le nom d'utilisateur et rediriger
            const redirectUrl = `/Homepage?username=${encodeURIComponent({decodeToken})}`;
            window.location.href = redirectUrl;
          });
        } catch (error) {
          console.log('Error parsing response:', error);
        }
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  render() {
    const { userName } = this.state;

    return (
      <div className="Id">
     
        <h2>{userName}</h2>
     
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="username">{this.props.title} :</label>
          <input type="text" id="username" name="userName" value={userName} placeholder="" onChange={this.handleInputChange} />
          <label htmlFor="password">{this.props.title2}</label>
          <input type="password" id="password" name="password" />
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






