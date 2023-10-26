import React from 'react';

export const NumberInputWithSymbol = ({ label, id, value, onChange, symbol }) => {
    return (
        <div className="data" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
            <label className="label-fixed-width" htmlFor={id}>{label}</label>
            <div style={{ position: 'relative', width: '46%' }}>
                <input 
                    type="number" 
                    id={id} 
                    name={id} 
                    value={value} 
                    onChange={onChange} 
                    min="0" 
                    step="0.01" 
                    style={{ width: "100%", paddingRight: '20px' }} 
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>{symbol}</span>
            </div>
        </div>
    );
};