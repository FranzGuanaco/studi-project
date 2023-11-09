import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import categorie_icon from './categorie_icon.png'
import './Navbar.css';
import Searchbar from './Searchbar';
import Button from '../Button';


function Navbar(props) {
  const { showSearchbar, showWelcomeText, buttonColor, text, handleClick, display, categoryIcon } = props;
  const options = ['pantalon', 'chaussure', 'Manteau'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 

  return (
    <nav className="navbar">
      <div className="position" style={{ paddingLeft: "5%", position: "relative", color: "white" }}>
        {showWelcomeText && <h3>Hello</h3>}
      </div>
      <div className="navbar-center">
        <div className="position" style={{ paddingLeft: "42%", position: "relative" }}>
          {showSearchbar && <Searchbar />}
        </div>
      </div>

      <ul className="navbar-list">
        <li className="navbar-item">
          <Button color={buttonColor} text={text} onClick={handleClick} />
        </li>
        {display && (
          <li className="navbar-item">
            <img
              src={categoryIcon}
              alt="Quiz"
              style={{ width: '35px', cursor: 'pointer' }}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
                
              <div className="dropdown-content" style={{ position: 'absolute'}}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-option"
                    style={{ margin: '20px'}}
                    onClick={() => props.handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}


Navbar.defaultProps = {
    categoryIcon: categorie_icon,
    showSearchbar: true,
    showWelcomeText: false,
    buttonColor:'#9a9a9a',
    text: 'Espace admin',
    display: false
  }

export default Navbar;
