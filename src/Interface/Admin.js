import Navbar from '../Component/Navbar/navbar';
import ProductBox from '../Component/Product/ProductBox';
import Button from '../Component/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    // States pour chaque champ d'entrée
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [promotion, setPromotion] = useState('');
    const [categorie, setCategorie] = useState(1);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/produits")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Erreur lors de la récupération des produits:", error));
    }, []);

       const handleInputChange = (event, setStateFunction) => {
          setStateFunction(event.target.value);
      };


    const handleAddProduct = () => {
        const productData = {
            libelle: nom,
            description: description,
            prix: prix,
            image_url: "", // À remplir selon le besoin
            categorie_id: 1, // À adapter selon la correspondance de l'ID de la catégorie
            statut_promotion: true,
            // image: "" // À remplir selon votre besoin
        };


        axios.post("http://localhost:3001/nvproduits", productData)
            .then(response => {
                // Mettre à jour la liste des produits ou d'autres actions
                setProducts(prevProducts => [...prevProducts, response.data]);
                console.log("Produit ajouté avec succès !", response.data); // Log pour le succès
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du produit"); // Log pour les erreurs
            });
    };


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
        <input type="text" id="nom" name="nom" value={nom} onChange={e => setNom(e.target.value)} style={{ width: "50%" }} />
      </div>

      <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} style={{ width: "50%" }} />
      </div>

      <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="prix">Prix: </label>
        <input type="text" id="prix" name="prix" value={prix} onChange={e => setPrix(e.target.value)} style={{ width: "50%" }} />
      </div>

      <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
        <label className="label-fixed-width" htmlFor="promotion">Promotion: </label>
        <input type="text" id="promotion" name="promotion" value={promotion} onChange={e => setPromotion(e.target.value)} style={{ width: "50%" }} />
      </div>

      <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
    <label className="label-fixed-width" htmlFor="categorie">Catégorie: </label>
    <select 
        id="categorie" 
        name="categorie" 
        style={{ width: "50%" }} 
        value={categorie}
        onChange={event => handleInputChange(event, setCategorie)}
    >
        <option value="1">Chaussure</option>
        <option value="2">Marteau</option>
        <option value="3">Robe</option>
    </select>
</div>

</div>

      <div className="Button" style={{ marginTop: "200px" }}>
      <Button onClick={handleAddProduct}/>
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
