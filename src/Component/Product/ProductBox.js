import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS

const ProductBox = ({ imageUrl, productName, shortDescription, showDescription }) => {
  return (
    <div>
      <div className="square">
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
  shortDescription: "Courte description par défaut",
  showDescription: true
};

export default ProductBox;


