import React,  { useEffect, useState ,createContext } from "react";
import ApiInstance from "../common/baseUrl";
import "./App.css";
import axios from "axios";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import BuyerTrustServices from "./components/Services/BuyerTrustServices";
import Auth from "./pages/Auth";
import NavBar from "./components/Navbar/NavBar";
import ShoppingCart from "./components/Cart/ShoppingCart"
import { useDispatch , useSelector} from "react-redux";
import { getUser } from "./features/authSlice";
import UserProfile from "./pages/UserProfile";
import UserInfo from "./components/user_Dashboard/profile/UserInfo";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProductsLayout from "./components/adminDashboard/Products/Products_Layout";
import Chart from "./components/adminDashboard/Chart";
import Orders from "./components/adminDashboard/Orders";
import MyOrders from "./components/user_Dashboard/MyOrders";
import Displaylayout from "./components/adminDashboard/display/DisplayLyout";
import Customers from "./components/adminDashboard/Customers";
import Email from "./components/adminDashboard/Email";
import PageNoteFound from "../common/PageNoteFound";
import HomeDashboard from "./components/adminDashboard/HomeDashboard";
import { getProduct } from "./features/productSlice";
import Notifications from "./components/user_Dashboard/Notifications";
import PrivacyPolicy from "./components/polices/PrivacyPolicy";
import RefundPolicy from "./components/polices/RefundPolicy";
import TermsOfServices from "./components/polices/TermsOfServices";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/ContactUs";
import HelpCenter from "./components/user_Dashboard/Help-center/HelpCenter";
import ShippingPolicy from "./components/polices/ShippingPolicy";
export const OrderContext = createContext();
function App() {
   const dispatch = useDispatch()
   const cartItems = useSelector(state=> state.cart.cartItems)
   const [newArrivalsProducts, setNewArrivalsProducts] = useState([])
    const [formData, setFormData ] = useState({
      firstName: "",
      lastName:"",
      userId:"",
      email: "",
      city:"",
      address2:"",
      zip:"",
      state:"",
      country:"",
      address1:"",
      shippingMethod:null,
      shippingPrice:0.00,
      deliveryTime: "",
      totalPrice:"",
      currency:"usd",
      ordered_products:cartItems,
  
  
  });
 

useEffect(() => {
    dispatch(getProduct())
    dispatch(getUser())
  }, []);
  return (
    <OrderContext.Provider value={{  formData, setFormData}}>

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar outlet={<Outlet />} />
              <Footer />
            </>
          }
        >
          <Route
            path="/"
            element={
              <>
                <HomePage /> 
                <BuyerTrustServices />
              </>
            }
          />
          <Route path="/shopping-cart" element={<ShoppingCart/>}/>
              <Route path = "contact-us"          element = {<ContactUs/>} />
              <Route path = "about-us"            element = {<AboutUs />} />              
              <Route path = "privacy-policy"      element = {<PrivacyPolicy/>}/>
              <Route path = "terms-of-services"   element = {<TermsOfServices/>}/>
              <Route path = "return-policy"       element = {<RefundPolicy/>}/>
              <Route path = "shipping-policy"       element = {<ShippingPolicy/>}/>


              <Route path = "help-center" element = {<HelpCenter/>}/>
        </Route>

      <Route path="/auth" element={<Auth />} />

      <Route path ="/profile" element={<UserProfile/>}>
      <Route path ="/profile" element= {<UserInfo/>}/>
      <Route path ="/profile/my-orders" element= {<MyOrders/>}/>
      <Route path ="/profile/notifications" element= {<Notifications/>}/>
      <Route path = "/profile/help-center"  element = {<HelpCenter/>}/>
      <Route path = "/profile/contact-us"   element = {<ContactUs/>} />
      </Route>
      <Route path ="/checkout" element={<CheckoutPage/>}/>
      
 
      
      <Route path ="/admin-dashboard" element={<AdminDashboardPage/>}>
              <Route path = "/admin-dashboard"           element = {<HomeDashboard/>}/>
              
              <Route path = "dashproducts"     element = {<ProductsLayout/>} />
              <Route path = "analytics"        element = {<Chart/>} />
              <Route path = "display-setting"  element = {<Displaylayout/>} />
              <Route path = "dashboard-orders" element = {<Orders/>}/>
              <Route path = "emails"           element = {<Email/>}/>
              <Route path = "customers"        element = {<Customers/>}/>
            </Route>
            <Route path = "*"                  element = {<PageNoteFound/>}/>
      </Routes>
      
    </BrowserRouter>
    </OrderContext.Provider>
  );
}

export default App;
