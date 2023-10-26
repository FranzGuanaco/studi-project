import React from 'react';

export const TextInput = ({ label, id, value, onChange }) => {
    return (
        <div className="data" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
            <label className="label-fixed-width" htmlFor={id}>{label}</label>
            <input type="text" id={id} name={id} value={value} onChange={onChange} style={{ width: "50%" }} />
        </div>
    );
};


export default TextInput;