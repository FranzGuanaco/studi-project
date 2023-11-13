import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Component/Navbar/navbar';
import ProductBox from '../Component/Product/ProductBox';
import ProductRecent from '../Component/Product/ProductRecent';
import Button from '../Component/Button';
import TextInput from '../Component/Input/Textinput';
import { DropdownInput } from '../Component/Input/Dropdown';
import { NumberInputWithSymbol } from '../Component/Input/Numberinput';
import { useNavigate } from 'react-router-dom';
import '../App.css'


const Admin = () => {
    // 2. States pour gérer les champs d'entrée et les produits
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [categorie, setCategorie] = useState(1);
    const [products, setProducts] = useState([]);
    const [image, setImage] = useState(null);

    function resolveImageUrl(imageUrl) {
      // Si l'URL commence par "/Users" (ou tout autre chemin local), alors on la considère comme locale
      if (imageUrl.startsWith('/Users')) {
          return `http://localhost:3001/images/${imageUrl.split('/').pop()}`;
      }
      // Sinon, on retourne l'URL telle quelle
      return imageUrl;
  }
  

    // 3. Appel API pour récupérer les produits au chargement du composant
    useEffect(() => {
        axios.get("http://localhost:3001/produits")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Erreur lors de la récupération des produits:", error));
    }, []);

    // 4. Gestion du changement d'image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImage(file);
        }};

    // 5. Gestion des changements des inputs
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    // 6. Gestion de l'ajout d'un nouveau produit
    const handleAddProduct = async () => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('libelle', nom);
      formData.append('description', description);
      formData.append('prix', prix);
      formData.append('categorie_id', categorie);
      formData.append('statut_promotion', 'true');
  
      axios.post('http://localhost:3001/addProductWithImage', formData)
          .then(response => {
              setProducts(prevProducts => [...prevProducts, response.data]);
              console.log("Produit ajouté avec succès !", response.data);
          
          // Recharger la page
        window.location.reload();
    })
          .catch(error => {
              console.error("Erreur lors de l'ajout du produit:", error);
          });
  };

  const navigate = useNavigate();

  const goToCatalogue = () => {
    navigate('/Catalogue')
    console.log('test')
};


    // 7. Rendu du composant
    return (
      <div>
          <div className="NavStyle">
              <Navbar showSearchbar={false} showWelcomeText={true} buttonColor="green" text="Catalogue" handleClick={goToCatalogue}/>
          </div>
          <div className="Boxcontent" style={{ marginLeft: "25%", marginTop: '5%', width: "35%", position: "fixed" }}>
              <h3>Ajoutez un nouveau produit</h3>
              <div className="content" style={{ marginLeft: "15%" }}>
                  <input type="file" onChange={handleImageChange} />
                  <ProductBox boxWidth="80%" boxHeight="400px" display={false} />
              </div>
  
              <div className="Boxcontent" style={{ width: "100%", marginTop: '50px' }}>
                  <TextInput label="Nom:" id="nom" value={nom} onChange={e => setNom(e.target.value)} />
                  <TextInput label="Description:" id="description" value={description} onChange={e => setDescription(e.target.value)} />
                  <div className="NumberInputWithSymbol" style={{ marginTop: '20px' }}>
                  <NumberInputWithSymbol label="Prix:" id="prix" value={prix} onChange={e => setPrix(e.target.value)} symbol="€" />
                  </div>
                  <div className="NumberInputWithSymbol" style={{ marginTop: '20px' }}>
                  <DropdownInput
                      label="Catégorie:" 
                      id="categorie" 
                      value={categorie} 
                      onChange={event => handleInputChange(event, setCategorie)}
                      options={[
                          { value: "1", label: "Pantalon"},
                          { value: "2", label: "Chaussure" },
                          { value: "3", label: "Manteau" }
                      ]}/>
                      </div>
            
              </div>
  
          <div className="Button">
          <Button onClick={handleAddProduct} color="black" text="Creer produit">Ajouter produit</Button>
          </div>
            </div>
          <div className="Boxcontent" style={{marginLeft: "77%", marginTop:'3%' , width:"15%", position:"fixed"}}>
          <h4>Produit récemment ajouté</h4>
          <div className='recent' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {products.map((product, index) => (
          <div key={product.id} style={{ marginBottom: index !== products.length - 1 ? '12px' : '0' }}>
         <ProductRecent 
            imageUrl={resolveImageUrl(product.image_url)} 
            productName={product.libelle} 
            shortDescription={product.description}
            display={true} 
            width='200px'
            height='200px'
            />
           </div>
           ))}
          </div>

          </div>
        </div>
      );
    };
    
    export default Admin;