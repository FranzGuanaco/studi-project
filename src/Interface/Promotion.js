import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../Component/Navbar/navbar'; // Assurez-vous que le chemin est correct
import ProductBox from '../Component/Product/ProductBox'; // Assurez-vous que le chemin est correct
import { NumberInputWithSymbol } from '../Component/Input/Numberinput'; // Assurez-vous que le chemin est correct
import Button from '../Component/Button';
import { useNavigate } from 'react-router-dom';


const Promotion = () => {
    const location = useLocation();
    const [productData, setProductData] = useState(location.state?.productdata);
    const [originalPrice, setOriginalPrice] = useState(productData?.prix); // Stockez le prix original
    const [discount, setDiscount] = useState('');

    useEffect(() => {
        // Si productData change, mettez à jour le prix original
        setOriginalPrice(productData?.prix);
    }, [productData]);


    function resolveImageUrl(imageUrl) {
        if (imageUrl.startsWith('/Users')) {
            return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
        }
        return imageUrl;
    }

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
    };

    const applyDiscount = () => {
        // Si la réduction est vide, rétablissez le prix original
        if (!discount && originalPrice) {
            setProductData({ ...productData, prix: originalPrice });
            return;
        }
        // Appliquez la réduction
        const discountedPrice = originalPrice - (originalPrice * discount / 100);
        setProductData({ ...productData, prix: discountedPrice.toFixed(2) });

        // Envoyez la requête POST à l'API Flask pour mettre à jour la base de données
        axios.post('http://localhost:3001/update-product-info', {
        product_id: productData.id,
        new_price: discountedPrice,  // Le nouveau prix calculé
    })
    .then(response => {
        console.log(response.data.message); // Affichez le message de succès de l'API
        console.log('Prix et statut de la promotion modifié');
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour des informations du produit :', error);
    });
};

    const Reload = () => {

        // Envoyez la requête POST à l'API Flask pour mettre à jour la base de données avec le prix original
        axios
            .post('http://localhost:3001/reset-product-price', {
                product_id: productData.id,
            })
            .then(response => {
                console.log(response.data.message);
                console.log("reussi");
                // Rechargez la page après avoir réinitialisé le prix
                setOriginalPrice(response.data.prix_original);
             
                
            })
            .catch(error => {
                console.error('Erreur lors de la réinitialisation du prix :', error);
            });
    };

    const navigate = useNavigate();

    const goToCatalogue = () => {
        navigate('/Catalogue')
        console.log('test')
    };


    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="NavStyle">
                <Navbar buttonColor="green" text="Catalogue" handleClick={goToCatalogue}/>
            </div>
            {productData && (
                <div className="Boxcontent" style={{ marginLeft: "40%", marginTop: '5%', width: "35%", position: "fixed" }}>
                    <div className="MenuStyle" style={{ paddingTop: "20%", width: "44%" }}>
                        <ProductBox 
                            key={productData.id}
                            imageUrl={resolveImageUrl(productData.image_url)}
                            productName={productData.libelle}
                            shortDescription={productData.description}
                            display={true}
                        />
                        <h4>Prix: {originalPrice}€</h4>
       
                    </div>
                
                    <div className="NumberInputWithSymbol" style={{ marginTop: '1%', width: "35%", position: "fixed" }}>
                        <NumberInputWithSymbol 
                            label="Réduction (%)"
                            id="discount"
                            value={discount}
                            symbol="%"
                            onChange={handleDiscountChange}
                        />
                       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', paddingTop:"10%" }}>
                        <Button onClick={applyDiscount} color='black' text='Réduction'></Button>
                         <Button onClick={Reload} color='gray' text='Retour au prix original'></Button>
                        </div>
                        </div>
                        </div>
                        )}
        </div>
    );
};

export default Promotion;


