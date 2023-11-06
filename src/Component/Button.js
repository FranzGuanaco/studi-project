import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import "./Button.css"

function Button(props) {
    const { text, color, fontSize, fontWeight, onClick } = props;

    return (
        <div>
            <button onClick={onClick} style={{ backgroundColor: color, fontSize, fontWeight }} className="edit-btn">
                {text}
            </button>
        </div>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    navigateTo: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string
};

Button.defaultProps = {
    text: 'Espace admin',
    color: '#9a9a9a', // Default color grey
    fontSize: '13px', // Default font size
    fontWeight: 'bold' // Default font weight
};

export default Button;

