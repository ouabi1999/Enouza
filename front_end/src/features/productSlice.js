import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiInstance from '../../common/baseUrl';

export const getProduct = createAsyncThunk("product/getProduct", (_, { rejectWithValue }) => {
    return ApiInstance.get("product-api/")
    
    .then((response) => {
        console.log(response.data)
        return response.data ; 
    })
    .catch(error => {
      console.error('Profile fetch error:', error);
     
      console.log(error)
      // Redirect to login if the profile fetch fails
      return rejectWithValue(error.response?.data || "Failed to fetch user profile");
  
    });
    });
export const products_Slice = createSlice({
   name:"product",
   initialState:{
       productData:{},
       nextStart : 0,
       totalProducts : 0,
       isLoading : true,
       hasError  :false,
       isProductsLoaded: null,
       
   },
   reducers:{
       setProducts(state, action){
           state.products = [...state.products, ...action.payload]
           state.isProductsLoaded = true
        },
       
        
       
        setNextStart(state, action){

        },
        setTotalProducts(state, action){
            
        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = action.error.message;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.isLoading = false;

      });
      
    }
})
export const {setProducts } = products_Slice.actions
export default products_Slice.reducer