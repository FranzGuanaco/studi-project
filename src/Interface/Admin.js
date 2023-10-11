import React from 'react';
import Navbar from '../Component/Navbar/navbar';
import ProductBox from '../Component/Product/ProductBox';
import Button from '../Component/Button';

const Admin = () => {
  return (
    <div>
      <div className="NavStyle">
        <Navbar showSearchbar={false} showWelcomeText={true} buttonColor='#46D075'/>
      </div>
      <div className="Boxcontent" style={{marginLeft: "25%", marginTop:'5%', width:"35%", position:"fixed"}}>
        <h3>Ajoutez un nouveau produit</h3>
        <div className="Bocontent" style={{marginLeft: "15%"}}>
        <ProductBox boxWidth= "80%" boxHeight="400px" showDescription={false} />
        </div>

        <div className="Boxcontent" style={{ width: "100%" }}>
        <div className="data" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" style={{ width: "50%", marginLeft: '7%' }} />
        </div>

       <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: "1%" }}>
       <label htmlFor="prix">Prix: </label>
      <input type="text" id="prix" name="prix" style={{ width: "50%", marginLeft: '17%' }} />
      </div>

     <div className="data" style={{ flexDirection: 'row', alignItems: 'center', marginTop: "1%" }}>
    <label htmlFor="promotion">Promotion: </label>
    <input type="text" id="promotion" name="promotion" style={{ width: "50%", marginLeft: '8%' }} />
    </div>
    </div>
    <Button/>
        </div>

      <div className="Boxcontent" style={{marginLeft: "77%", marginTop:'3%' , width:"15%", position:"relative"}}>
      <h4>Produit récemment ajouté</h4>
      <div className='recent' style={{display: 'flex', justifyContent: 'center'}}>
      <ProductBox boxWidth= "90%" boxHeight="150px" />
      </div>
      </div>
    </div>
  );
};

export default Admin;
