import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import categorie_icon from './categorie_icon.png'
import './Navbar.css';
import Searchbar from './Searchbar';
import Button from '../Button';


function Navbar(props) {
    return (
        <nav className="navbar" >
           <div className="navbar-center">
                <div className="position" style={{paddingLeft: "50%", position:"relative"}}>
                <Searchbar />
            </div>
            </div>
            
         <ul className="navbar-list">
        <li className="navbar-item">
         <Link to="/result">
         <Button/>
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
   
  }

export default Navbar;
