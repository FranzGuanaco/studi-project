import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import categorie_icon from './categorie_icon.png'
import './Navbar.css';
import Searchbar from './Searchbar';
import Button from '../Button';


function Navbar(props) {
    const showSearchbar = props.showSearchbar; 
    const showWelcomeText = props.showWelcomeText; 

    return (
        <nav className="navbar" >
            <div className="position" style={{paddingLeft: "5%", position:"relative", color:"white"}}>
            {showWelcomeText && <h3>Hello</h3>}
            </div>
           <div className="navbar-center">
                <div className="position" style={{paddingLeft: "42%", position:"relative"}}>
                {showSearchbar && <Searchbar />}
            </div>
            </div>
            
         <ul className="navbar-list">
        <li className="navbar-item">
         <Link to="/result">
         <Button color={props.buttonColor}/>
         </Link>
        </li>
        <li className="navbar-item" >
         <Link to="/result">
         <div className="image-container">
         <img src={props.categoryIcon} alt="Résultat" style={{ width: '30px' }} />
         </div>
         </Link>
        </li>
        </ul>
        
    </nav>

    );
}

Navbar.defaultProps = {
    categoryIcon: categorie_icon,
    showSearchbar: true,
    showWelcomeText: false,
    buttonColor:'#9a9a9a'
   
  }

export default Navbar;
