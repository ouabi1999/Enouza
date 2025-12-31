import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiInstance from '../../common/baseUrl';


export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiInstance.get(`/product/${id}`);
      return response.data; // Axios returns parsed JSON here
    } catch (error) {
      // Axios throws for non-2xx status, so handle here
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const productDetails_Slice = createSlice({
   name:"product",
   initialState:{
       productData: null,
       isLoaded : false,
       hasError : false
       
   },
   reducers:{
       setProductDetails(state, action){
           state.product = action.payload
          
       }
   },

   extraReducers:(builder) =>{
    builder.addCase(getProductDetails.pending, (state) => {
    state.isLoaded = true;
    }),
    builder.addCase(getProductDetails.rejected, (state, action) => {
    state.isLoaded = false;
    state.hasError = action.error.message;
    }),
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
    state.productData = action.payload;
    state.isLoaded = false;
    

    })


   }
})

export const {setProductDetails } = productDetails_Slice.actions
export default productDetails_Slice.reducer