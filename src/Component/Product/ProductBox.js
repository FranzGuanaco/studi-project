import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS

const ProductBox = ({ imageUrl, productName, shortDescription, display, width, height }) => {
  return (
    <div>
      <div className="square" style={{width: width, height: height}}>
        <img src={imageUrl} alt="Votre image" className="square-image" />
      </div>
      {display && (
      <div className="DescriptionStyle">
        <p>{productName} {shortDescription}</p>
      </div>
       )}
    </div>
  );
}

ProductBox.defaultProps = {
  productName: "Nom:",
  shortDescription: "Courte description par défaut",
  display: true,
  width: "300px",
  height: "330px"
};

export default ProductBox;





