import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS


const ProductBox = ({ imageUrl, productName, shortDescription, showDescription, boxWidth, boxHeight }) => {
  const squareStyle = {
    width: boxWidth, // Utilisez "width" au lieu de "boxWidth" comme clé de style
    height: boxHeight
  };

  return (
    <div>
      <div className="square" style={squareStyle}>
        <img src={imageUrl} alt="Votre image" className="square-image" />
      </div>
      <div className="DescriptionStyle">
        {showDescription && <p>{productName} {shortDescription}</p>}
      </div>
    </div>
  );
}

ProductBox.defaultProps = {
  productName: "Nom:",
  boxWidth: "33px",
  boxHeight: "33px",
  shortDescription: "Courte description par défaut",
  showDescription: true
};

export default ProductBox;



