import React from 'react';
import Navbar from '../Component/Navbar/navbar';
import CategoryBox from '../Component/Categorie/Category';
import ProductBox from '../Component/Product/ProductBox';

const Catalogue = () => {
  return (
    <div className="App"  style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
        <CategoryBox style={{ width: "44px" }} />
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
        <ProductBox display={true} />
      </div>
    </div>
  );
};

export default Catalogue;

