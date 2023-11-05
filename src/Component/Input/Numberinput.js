import React from 'react';
import './Numberinput.css'


    export const NumberInputWithSymbol = ({ label, id, value, onChange, symbol }) => {
        return (
          <div className="data flex-container">
            <label className="label-fixed-width" htmlFor={id}>{label}</label>
            <div className="input-container">
              <input 
                type="number" 
                id={id} 
                name={id} 
                value={value} 
                onChange={onChange} 
                min="0" 
                step="0.01" 
                className="number-input" 
              />
              <span className="input-symbol">{symbol}</span>
            </div>
          </div>
        );
      };
      