import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cartSlice"
import authReducer from "../features/authSlice"
import display_Reducer from "../features/DisplaySlice"
import productReducer from "../features/productSlice"
import locationReducer from "../features/locationSlice"


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    display: display_Reducer,
    products : productReducer,
    location : locationReducer
  },
})