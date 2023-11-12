import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../Component/Navbar/navbar'; // Assurez-vous que le chemin est correct
import ProductBox from '../Component/Product/ProductBox'; // Assurez-vous que le chemin est correct
import { NumberInputWithSymbol } from '../Component/Input/Numberinput'; // Assurez-vous que le chemin est correct
import Button from '../Component/Button';
import { Inputdate } from '../Component/Input/Inputdate';
import { useNavigate } from 'react-router-dom';


const Promotion = () => {
    const location = useLocation();
    // Utilisez l'état pour gérer les données du produit, le prix original, la réduction et les dates de promotion
    const [productData, setProductData] = useState(location.state?.productdata);
    const [originalPrice, setOriginalPrice] = useState(productData?.prix); // Stockez le prix original du produit
    const [discount, setDiscount] = useState(''); // Pourcentage de réduction
    const [date_debut_promotion, setDebut] = useState(''); // Date de début de la promotion
    const [date_fin_promotion, setFin] = useState(''); // Date de fin de la promotion

    useEffect(() => {
        // Mettre à jour le prix original lorsque productData change
        setOriginalPrice(productData?.prix);
    }, [productData]);

    // Fonction pour résoudre l'URL de l'image
    function resolveImageUrl(imageUrl) {
        // Si l'URL de l'image commence par '/Users', modifiez-la pour qu'elle pointe vers le serveur
        if (imageUrl.startsWith('/Users')) {
            return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
        }
        return imageUrl;
    }

    // Gestionnaire pour le changement de la réduction
    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
    };

    // Appliquer la réduction
    const applyDiscount = () => {
        // Si aucune réduction n'est appliquée, rétablissez le prix original
        if (!discount && originalPrice) {
            setProductData({ ...productData, prix: originalPrice });
            return;
        }

        // Calculez le prix avec la réduction appliquée
        const discountedPrice = originalPrice - (originalPrice * discount / 100);
        setProductData({ ...productData, prix: discountedPrice.toFixed(2) });

        // Envoyez la requête POST à l'API Flask pour mettre à jour les informations du produit
        axios.post('http://localhost:3001/update-product-info', {
            product_id: productData.id,
            new_price: discountedPrice,
            date_debut_promotion,
            date_fin_promotion
        })
        .then(response => {
            console.log(response.data.message); // Log le message de succès ou d'erreur de l'API
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour de la base de données :', error);
        });
    };

    // Réinitialiser le prix du produit à sa valeur originale
    const Reload = () => {
        setProductData({ ...productData, prix: originalPrice });

        // Envoyez la requête POST à l'API Flask pour réinitialiser le prix
        axios.post('http://localhost:3001/reset-product-price', {
            product_id: productData.id,
        })
        .then(response => {
            console.log(response.data.message);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la réinitialisation du prix :', error);
        });
    };

    // Utiliser navigate pour rediriger vers la page du catalogue
    const navigate = useNavigate();
    const goToCatalogue = () => {
        navigate('/Catalogue');
        console.log('test');
    };
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="NavStyle">
                <Navbar showSearchbar={false} showWelcomeText={true} buttonColor="green" text="Catalogue" handleClick={goToCatalogue}/>
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
                         <div className="InputdateStyle" style={{ marginTop: '20px' }}>
                    <Inputdate label={'Date de début'} id="début" value={date_debut_promotion} onChange={e => setDebut(e.target.value)}/>
                    </div>
                    <div className="InputdateStyle" style={{ marginTop: '20px' }}>
                    <Inputdate label={'Date de fin'} id="fin" value={date_fin_promotion} onChange={e => setFin(e.target.value)}/>
                    </div>
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


