import React from 'react';
import Navbar from '../Component/Navbar/navbar';
import ProductBox from '../Component/Product/ProductBox';

const Admin = () => {
  return (
    <div>
      <div className="NavStyle">
        <Navbar showSearchbar={false} showWelcomeText={true} buttonColor='#46D075'/>
      </div>
      <div className="Boxcontent" style={{marginLeft: "25%", marginTop:'5%', width:"40%", position:"fixed"}}>
        <h3>Ajoutez un nouveau produit</h3>
        <ProductBox style={{width: "44px" }} showDescription={false}/>

        <div className="Boxcontent" style={{ width: "100%" }}>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" style={{ width: "10%", marginLeft: "4%" }}/>

        <div className="data" style={{ marginTop: "1%" }}>
        <label htmlFor="description">Prix: </label>
        <input type="text" id="description" name="description" style={{ width: "10%", marginLeft: "12%" }}/>
        </div>

        <div className="data" style={{ marginTop: "1%" }}>
        <label htmlFor="description">Promotion: </label>
        
        <input type="text" id="description" name="description" style={{ width: "10%", marginLeft: "5%"  }}/>
        
        </div>
        </div>
      </div>

      <div className="Boxcontent" style={{marginLeft: "77%", marginTop:'3%' , width:"20%", position:"relative"}}></div>
    </div>
  );
};

export default Admin;
