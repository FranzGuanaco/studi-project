import React from 'react';
import './ProductBoxRecent.css'; // Importez le fichier CSS

const ProductRecent = ({ imageUrl, productName, shortDescription, display}) => {
  return (
    <div>
      <div className="squareRecent">
        <img src={imageUrl} alt="Votre image" className="square-image" />
      </div>
      {display && (
      <div className="DescriptionStyleRecent">
        <p>{productName} {shortDescription}</p>
      </div>
       )}
    </div>
  );
}

ProductRecent.defaultProps = {
  productName: "Nom:",
  shortDescription: "Courte description par défaut",
  display: true
};

export default ProductRecent;