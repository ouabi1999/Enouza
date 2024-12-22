import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const getDisplayInfo = createAsyncThunk("displayInfo/getDisplayInfo", () => {
    return fetch("/displayInfo")
    .then((response) => {
    if (!response.ok){
  
      throw Error(response.statusText);
    }
     return response.json();
    })
    .then((data) => data);
    });

    export const getDisplayInfoSlice = createSlice({
        name:"display",
        initialState:{
            display: {
                id: null,
                logo: "",
                header: {

                    title: "",
                    banner: "",

                },
                main_category: [],
                category: [],
                banners: [],
                slider: [],
                pop_up: [],
                count_Down: false,
            },
            isLoaded : false,
            hasError : false
            
        },
        reducers:{
            setDisplayInfo(state, action){
                state.display = action.payload
               
            }
        },
        
         extraReducers: (builder) => {
            builder
            .addCase(getDisplayInfo.pending, (state, action) => {
                state.isLoaded = true;
            })
            .addCase(getDisplayInfo.rejected, (state, action) => {
                state.isLoaded = false;
                state.hasError = action.error.message;
          })
          .addCase(getDisplayInfo.fulfilled, (state, action) => {
             
            if(payload !== null){
                state.display = payload;
            }
         state.isLoaded = false;
          });
          
        }
     })
     export const { setDisplayInfo } = getDisplayInfoSlice.actions
     export default getDisplayInfoSlice.reducer