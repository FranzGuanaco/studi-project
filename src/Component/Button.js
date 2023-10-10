import React from 'react';
import PropTypes from 'prop-types';
import "./Button.css"

function Button(props) {

    const boutonStyle = {
        backgroundColor: props.color,
        fontSize: '13px', // Taille de police de 12px
        fontWeight: 'bold', // Texte en gras
      };
    return (
        <div>
            <button onClick={props.onClick} style={boutonStyle} className="edit-btn">
                {props.text}
            </button>
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    color: '#9a9a9a',
    text: 'Espace admin'
};

export default Button;
