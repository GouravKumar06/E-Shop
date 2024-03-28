import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useParams } from 'react-router-dom';
// import { productData } from '../static/data';
import { useSelector } from 'react-redux';


const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const {id} = useParams();
  const [data,setData] = useState(null);
  // const productName = name.replace(/-/g, ' ');
   
  useEffect(()=>{
    const data = allProducts && allProducts.find((i) => i?._id === id);
    setData(data);
  },[data,allProducts,id]);

  return (
    <div>
        <Header/>
        {
          data && <ProductDetails data={data} />
        }
        {/* <ProductDetails data={data} /> */}
        {
          data && <SuggestedProduct data={data} />
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage