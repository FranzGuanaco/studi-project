import React from 'react';
import './Category.css'; // Importez le fichier CSS pour le style

const CategoryBox = (props) => {
  return (
    <div className="category-box">
      <span className="category-text">{props.categorieName}</span>
    </div>
  );
};

CategoryBox.defaultProps = {
  categorieName: "categorie",
};

export default CategoryBox;