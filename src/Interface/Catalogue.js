import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';
import { useNavigate } from 'react-router-dom';

const Catalogue = () => {
    // Fonction pour traiter les URLs d'image
    function resolveImageUrl(imageUrl) {
        if (imageUrl.startsWith('/Users')) {
            return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
        }
        return imageUrl;
    }

    const navigate = useNavigate();
    // État pour gérer les catégories filtrées et les produits
    const [filteredCategories, setFilteredCategories] = useState(null);
    const [products, setProducts] = useState([]);
    const [categorie, SetCategorie] = useState([]);

    // Fonction pour naviguer vers une autre page avec les données du produit
    function Exportdata(productdata) {
        navigate('/Admin/Promotion', { state: { productdata } });
    }

    // Chargement des produits en fonction de la catégorie sélectionnée
    useEffect(() => {
        if (filteredCategories != null) {
            axios.get(`http://localhost:3001/filtre_produits`, {
                params: {
                    categorie_id: `${filteredCategories}`
                }
            })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching filtered products:', error));
        } else {
            axios.get('http://localhost:3001/produits')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching all products:', error));
        }
    }, [filteredCategories]);

    // Chargement des catégories au montage du composant
    useEffect(() => {
        axios.get("http://localhost:3001/categorie")
            .then(response => {
                SetCategorie(response.data);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    // Extraction des noms uniques des catégories pour le filtrage
    const uniqueCategories = [...new Set(products.map(product => product.categorie_libelle))];

    // Gestion du clic sur les options de catégorie
    const handleOptionClick = (option) => {
        setFilteredCategories(option ? [`${option}`] : []);
    };

    // Navigation vers la page Admin
    const goToAdmin = () => {
        navigate('/Admin');
    };
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="NavStyle">
            <Navbar handleClick={goToAdmin} display={'true'} handleOptionClick={handleOptionClick} />
            </div>
            <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
            {
            uniqueCategories.map(categoryName => (
              <React.Fragment key={categoryName}>
              <CategoryBox 
                style={{ width: "44px" }} 
                categorieName={categoryName} 
                />
              <div className="MenuStyle" style={{ paddingTop: "5%", width: "100%", marginLeft:"5%", display: "flex" }}>
              {products.filter(product => product.categorie_libelle === categoryName).map(filteredProduct => (
                 <div onClick={() => Exportdata(filteredProduct)} style={{ flex: "0 0 calc(44% - 12px)", marginRight: "5%", marginBottom: "12px" }}>
                <ProductBox 
                    key={filteredProduct.id}
                    imageUrl={resolveImageUrl(filteredProduct.image_url)}
                    productName={filteredProduct.libelle} 
                    shortDescription={filteredProduct.statut_promotion ? 
                    <strong>{`${filteredProduct.prix}€`}</strong> : 
                        `${filteredProduct.prix}€`}
                        display={true}  
                        />
                     </div>
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



