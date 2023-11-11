import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';
import { useNavigate } from 'react-router-dom';

const Catalogue = () => {

    function resolveImageUrl(imageUrl) {
        // Si l'URL commence par "/Users" (ou tout autre chemin local), alors on la considère comme locale
        if (imageUrl.startsWith('/Users')) {
            return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
        }
        // Sinon, on retourne l'URL telle quelle
        return imageUrl;
    }

  
        const navigate = useNavigate();
        const [filteredCategories, setFilteredCategories] = useState(null);
        const [products, setProducts] = useState([]);
        const [categorie, SetCategorie] = useState([]);
      
        

    function Exportdata(productdata) {
      // Faites quelque chose lorsque le composant est cliqué.
      navigate('/Admin/Promotion', { state: { productdata } });
  }

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

    useEffect(() => {
        axios.get("http://localhost:3001/categorie")
            .then(response => {
                SetCategorie(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("Erreur lors de la récupération des categories:", error));
    }, []);

    const uniqueCategories = [...new Set(products.map(product => product.categorie_libelle))];


  const handleOptionClick = (option) => {
    if (option != null) {
        setFilteredCategories([`${option}`]); // If 'pantalon' is clicked, set filteredCategories to only 'pantalon'
        console.log(`${option}`);
    } else {
        setFilteredCategories([]); // Otherwise, reset to show all categories.
        console.log(`${option}`);
    }
};

    const goToAdmin = () => {
             navigate('/Admin')
             console.log('test')
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
                    shortDescription={filteredProduct.description}
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



