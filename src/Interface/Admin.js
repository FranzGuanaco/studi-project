import Navbar from '../Component/Navbar/navbar';
import ProductBox from '../Component/Product/ProductBox';
import Button from '../Component/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/produits")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur lors de la récupération des produits:", error));
  }, []);

  return (
    <div>
      <div className="NavStyle">
        <Navbar showSearchbar={false} showWelcomeText={true}/>
      </div>
      <div className="Boxcontent" style={{ marginLeft: "25%", marginTop: '5%', width: "35%", position: "fixed" }}>
    <h3>Ajoutez un nouveau produit</h3>
    <div className="Bocontent" style={{ marginLeft: "15%" }}>
    <ProductBox boxWidth="80%" boxHeight="400px" display={false} />
</div>

<div className="Boxcontent" style={{ width: "100%", marginTop: '50px' }}>

    <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="nom">Nom: </label>
        <input type="text" id="nom" name="nom" style={{ width: "50%" }} />
    </div>

    <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" style={{ width: "50%" }} />
    </div>

    <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="prix">Prix: </label>
        <input type="text" id="prix" name="prix" style={{ width: "50%" }} />
    </div>

    <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="promotion">Promotion: </label>
        <input type="text" id="promotion" name="promotion" style={{ width: "50%" }} />
    </div>

    <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
    <label className="label-fixed-width" htmlFor="categorie">Catégorie: </label>
    <select id="categorie" name="categorie" style={{ width: "50%" }}>
        <option value="chaussure">Chaussure</option>
        <option value="marteau">Marteau</option>
        <option value="robe">Robe</option>
    </select>
</div>
</div>

      <div className="Button" style={{ marginTop: "200px" }}>
      <Button/>
      </div>
        </div>

      <div className="Boxcontent" style={{marginLeft: "77%", marginTop:'3%' , width:"15%", position:"relative"}}>
      <h4>Produit récemment ajouté</h4>
      <div className='recent' style={{display: 'flex', justifyContent: 'center'}}>
      {products.map(product => (
          <ProductBox 
            key={product.id} 
            imageUrl={product.image_url} 
            productName={product.libelle} 
            shortDescription={product.description}
            display={true} 
            width='200px'
            height='200px'
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Admin;
