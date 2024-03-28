import React,{useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {LoginPage} from './Routes.js';
import {SignupPage} from './Routes.js';
import {ActivationPage} from './Routes.js';
import {HomePage} from './Routes.js';
import {ProductPage} from './Routes.js';
import {BestSellingPage} from './Routes.js'
// import {EventsPage} from './Routes.js'
import {FAQPage} from './Routes.js';
import {CheckoutPage} from './Routes.js'
import {PaymentPage} from './Routes.js';
import {ProductDetailsPage} from './Routes.js';
import {ProfilePage} from './Routes.js';
import {OrderDetailsPage} from "./Routes.js";
import {TrackOrderPage} from "./Routes.js";

// shop routes
import {ShopCreate} from './Routes.js';
import {SellerActivationPage} from './Routes.js';
import {ShopLoginPage} from './Routes.js';
import {ShopHomePage} from './ShopRoutes.js';
import { 
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopSettingsPage
} from './ShopRoutes.js';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Store from './redux/store';
import {loadShop, loadUser} from './redux/actions/user';
import ProtectedRoute from './routes/ProtectedRoute.js';
import SellerProtectedRoute from './routes/SellerProtectedRoute.js';
import { getAllProduct } from './redux/actions/product.js';
import { getAllEvents } from './redux/actions/event.js';
import axios from 'axios';
import { server } from './server.js';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccessPage from './pages/OrderSuccessPage.jsx';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get(`${server}/payment/stripeApiKey`);
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    Store.dispatch(getAllProduct());
    Store.dispatch(getAllEvents()); 
    getStripeApiKey();
  },[])

  console.log(stripeApiKey);
  return (
      
    <BrowserRouter>
      {
        stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path='/payment' element={
                <ProtectedRoute>
                  <PaymentPage/>
                </ProtectedRoute>
              }/>
            </Routes>
          </Elements>
        )
      }
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:token' element={<ActivationPage/>}/>
        <Route path='/products' element={<ProductPage/>}/>
        <Route path='/product/:id' element={<ProductDetailsPage/>}/>
        <Route path='/best-selling' element={<BestSellingPage/>}/>
        {/* <Route path='/events' element={<EventsPage/>}/> */}
        <Route path='/faq' element={<FAQPage/>}/>

       
        <Route path='/checkout' element = {
          <ProtectedRoute >
            <CheckoutPage/>
          </ProtectedRoute>
        }/>

        <Route path='/order/success'element={<OrderSuccessPage/>} />
        
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>

        <Route path='/user/order/:id' element={
          <ProtectedRoute>
            <OrderDetailsPage/>
          </ProtectedRoute>
        }/>

        <Route path='/user/track/order/:id' element={
          <ProtectedRoute>
            <TrackOrderPage/>
          </ProtectedRoute>
        }/>

        <Route path='/shop-create' element={<ShopCreate/>}/>
        <Route path='/shop/activation/:seller_token' element={<SellerActivationPage/>}/>
        <Route path='/shop-login' element={<ShopLoginPage/>}/>
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        <Route path='/shop/:id' element={
          <SellerProtectedRoute >
            <ShopHomePage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/settings' element={
          <SellerProtectedRoute >
            <ShopSettingsPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard' element={
          <SellerProtectedRoute >
            <ShopDashboardPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute >
            <ShopCreateProductPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-orders' element={
          <SellerProtectedRoute >
            <ShopAllOrdersPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/order/:id' element={
          <SellerProtectedRoute >
            <ShopOrderDetailsPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-products' element={
          <SellerProtectedRoute >
            <ShopAllProductsPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute >
            <ShopCreateEventPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-events' element={
          <SellerProtectedRoute >
            <ShopAllEventsPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/dashboard-coupons' element={
          <SellerProtectedRoute >
            <ShopAllCouponsPage/>
          </SellerProtectedRoute>
        }/>

      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )    

}

export default App;
