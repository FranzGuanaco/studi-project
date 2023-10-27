import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';

const Catalogue = () => {

    function resolveImageUrl(imageUrl) {
        // Si l'URL commence par "/Users" (ou tout autre chemin local), alors on la considère comme locale
        if (imageUrl.startsWith('/Users')) {
            return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
        }
        // Sinon, on retourne l'URL telle quelle
        return imageUrl;
    }

    const [products, setProducts] = useState([]);
    const [categorie, SetCategorie] = useState([]); // Assurez-vous que vous utilisez cette variable ailleurs sinon c'est inutile

    useEffect(() => {
        axios.get("http://localhost:3001/produits")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Erreur lors de la récupération des produits:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/categorie")
            .then(response => {
                SetCategorie(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("Erreur lors de la récupération des categories:", error));
    }, []);

    const uniqueCategories = [...new Set(products.map(product => product.categorie_libelle))];

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="NavStyle">
                <Navbar />
            </div>
            <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
            {
            uniqueCategories.map(categoryName => (
              <React.Fragment key={categoryName}>
              <CategoryBox 
                style={{ width: "44px" }} 
                categorieName={categoryName} 
                />
              <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
                {products.filter(product => product.categorie_libelle === categoryName).map(filteredProduct => (
                    <ProductBox 
                        key={filteredProduct.id}
                        imageUrl={resolveImageUrl(filteredProduct.image_url)}
                        productName={filteredProduct.libelle} 
                        shortDescription={filteredProduct.description}
                        display={true} 
                        />
                        ))}
                  </div>
             </React.Fragment>
                         ))
                          }
            </div>
        </div>
    );
};

export default Catalogue;


