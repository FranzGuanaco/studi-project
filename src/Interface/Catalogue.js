import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/produits")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur lors de la récupération des produits:", error));
  }, []);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
        <CategoryBox style={{ width: "44px" }} />
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
        {products.map(product => (
          <ProductBox 
            key={product.id} 
            imageUrl={product.image_url} 
            productName={product.libelle} 
            shortDescription={product.description}
            display={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;


