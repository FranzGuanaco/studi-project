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
  handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:3001/login', {
      nom_utilisateur: this.state.userName,
      mot_de_passe: this.state.password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
        // Ici, vous pouvez également rediriger l'utilisateur vers une autre page ou effectuer d'autres actions selon les besoins.
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
  
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
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
          <input type="password" id="password" name="password" value={password} onChange={this.handlePasswordChange}/>
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






