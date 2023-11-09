import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';
import { useNavigate } from 'react-router-dom';

function resolveImageUrl(imageUrl) {

    
    if (imageUrl.startsWith('/Users')) {
        return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
    }
    return imageUrl;
}

const Catalogue = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState(null);
    const [uniqueCategories, setUniqueCategories] = useState([]);


    useEffect(() => {
        if (filteredCategories != null) {
            console.log(`voici ${filteredCategories}`);

            axios.get(`http://localhost:3001/pantalon`, {
                params: {
                    categorie_id: `${filteredCategories}`
                }
            })
            .then(response => {
                setProducts(response.data);
                console.log('Pantalon products fetched');
            })
            .catch(error => console.error('Error fetching pantalon products:', error));
        } else {
            axios.get('http://localhost:3001/produits')
            .then(response => {
                setProducts(response.data);
                console.log('All products fetched');
            })
            .catch(error => console.error('Error fetching products:', error));
        }
    }, [filteredCategories]);
    
      
    // Handlers for different actions.
    const handleOptionClick = (option) => {
        if (option != null) {
            setFilteredCategories([`${option}`]); // If 'pantalon' is clicked, set filteredCategories to only 'pantalon'
            console.log(`${option}`);
        } else {
            setFilteredCategories([]); // Otherwise, reset to show all categories.
            console.log(`${option}`);
        }
    };
    
    const exportData = productData => {
        navigate('/Admin/Promotion', { state: { productData } });
    };

    const goToAdmin = () => {
        navigate('/Auth');
    };

    // Derived state to get unique categories from products.
    useEffect(() => {
    
            setUniqueCategories([...new Set(products.map(product => product.categorie_libelle))]);
        
    }, [products, filteredCategories]);

    // The main render method returns the JSX for the component.
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="NavStyle">
                <Navbar handleClick={goToAdmin} display={'true'} handleOptionClick={handleOptionClick} />
            </div>
            <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
                {uniqueCategories.map(categoryName => (
                    
                    <React.Fragment key={categoryName}>
                        <CategoryBox style={{ width: "44px" }} categoryName={categoryName} />
                        <div className="MenuStyle" style={{ paddingTop: "5%", width: "100%", marginLeft: "5%", display: "flex" }}>
                            
                            {products.filter(product => product.categorie_libelle === categoryName).map(filteredProduct => (
                                <div onClick={() => exportData(filteredProduct)} style={{ flex: "0 0 calc(44% - 12px)", marginRight: "5%", marginBottom: "12px" }}>
                                    <ProductBox
                                        key={filteredProduct.id}
                                        imageUrl={resolveImageUrl(filteredProduct.image_url)}
                                        productName={filteredProduct.libelle}
                                        shortDescription={filteredProduct.description}
                                        display={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Catalogue;

