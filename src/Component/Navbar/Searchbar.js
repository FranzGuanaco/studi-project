import React from 'react';
import './Searchbar.css';

function Searchbar() {
    return (
        <div className="inputGroup">
            <input type="text" required autoComplete="off" />
            <label htmlFor="name">   Search...</label>
        </div>
    );
}

export default Searchbar;