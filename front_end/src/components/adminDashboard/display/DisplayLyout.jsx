import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import DisplayCategory from './DisplayCategory';
import DisplayCategoryMain from './DisplayCategoryMain';
import DisplayHeader from './DisplayHeader';
import DisplayLogo from './DisplayLogo';
import DisplaySlider from './DisplaySlider';
import { Button, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import DisplayBanners from './DisplayBanners';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayInfo } from "../../../features/DisplaySlice"
import { display } from '@mui/system';
import HeadeSeo from "../../../../common/HeadeSeo"
export default function DisplayLyout() {

    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const displayInfo = useSelector(state=> state.display)
    const [formData, setFormData] = useState(displayInfo.display);

    
    useEffect(() => {

      setFormData(displayInfo.display)
     
    },[displayInfo])
    const addNew = (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData();

        data.append("main_category", JSON.stringify(formData.main_category));
        data.append("category", JSON.stringify(formData.category));
        data.append("header", JSON.stringify(formData.header));
        data.append("banners", JSON.stringify(formData.banners));
        data.append("pop_up", JSON.stringify(formData.pop_up));
        data.append("slider", JSON.stringify(formData.slider));
        data.append("logo", formData.logo);
       
        data.append("count_Down", formData.count_Down);
        
    
        fetch("/display", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            setLoading(false)
              setFormData({
                  id:data.id,
                  logo : data.logo,
                  header : {

                  title: "",
                  banner: "",
                },
                  main_category : data.main_category,
                  category  : data.category,
                  banners : data.banners,
                  slider  : data.slider,
                  pop_up : data.pop_up,
                  count_Down : false

            })
              toast.success("added succesfully.")

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)

            });
        };


 
      
    const save = (event) =>{
            
      event.preventDefault();
      setLoading(true)
      const data = new FormData();
      formData.slider.forEach((item) => {
        data.append("slider", item);
      });
    
      data.append("main_category", JSON.stringify(formData.main_category));
      data.append("category", JSON.stringify(formData.category));
      data.append("header", JSON.stringify(formData.header));
      data.append("banners", JSON.stringify(formData.banners));
      data.append("pop_up", JSON.stringify(formData.pop_up));
    
      data.append("logo", formData.logo);
     
      data.append("count_Down", formData.count_Down);
      
  
      fetch(`/update-display-setting/${formData.id}`, {
        method: 'PUT',
        body: data
      })
        .then((response) => response.json())
        .then((result) => {
          setFormData(result);
          dispatch(setDisplayInfo(result))
          setLoading(false)
          toast.success("SAVED")

        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false)
          toast.error("an error accourd")
        });
    }
   
  return (
      <>
      <HeadeSeo title = "Dashboard / display settings"/>
      {displayInfo.isLoaded  === false ? (

      
      <Container>
         <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  className = 'foo-bar'
                />
        <div className='button-container'>
            <button onClick = {formData.id === null ? addNew :  save }  disabled = {loading ? true : false}> 
            {loading && (
                 <span className='loader'>
                 <CircularProgress
                   size={20}
                   thickness={6}
                 />
                </span>
            )} <span>save</span>
                
                </button>
        </div>
           <DisplayHeader 
              formData = {formData}
              setFormData = {setFormData}
           />
           <DisplayLogo 
               formData = {formData}
               setFormData = {setFormData}
           />

           <DisplaySlider 
                 formData = {formData}
                 setFormData = {setFormData}
           />
           <DisplayBanners 
               formData = {formData}
               setFormData = {setFormData}
           
           />

           <DisplayCategoryMain 
                formData = {formData}
                setFormData = {setFormData}
           
           />

           <DisplayCategory 
                formData = {formData}
                setFormData = {setFormData}
           />
            
           <div className='count-down-input'>
            <label htmlFor='input'> Count Down </label>
           <TextField
                    className="text_input"
                    id="filled-select-category"
                    select
                    label="input"
                    /*helperText="Please select your currency"*/
                    value={formData.count_Down}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            count_Down: event.target.value,
                        })
                    }
                >
                   
                        <MenuItem  value={true}>
                            True 
                        </MenuItem>
                        <MenuItem  value={false}>
                            False
                        </MenuItem>
                   
                </TextField>
           </div>
           
          
          
         
        </Container>
      ) :
        <LoadingContainer>
          <CircularProgress
            size={30}
            thickness={6} 
          />
        </LoadingContainer>
    }
    </>

  )
}
const Container = styled.div`
     
     position:relative;
     .button-container{
      
      position:sticky;
      width:fit-content;  
      top:2.5%;
      left:87%;
      z-index:1000;
      
         
     }
    .button-container button{
          background:lightseagreen;
          padding:5px 10px;
          height:35px;
          width:80px;
          font-size:18px;
          font-family:'Open Sans', 'Helvetica Neue', sans-serif;
          color:#fff;
          border-radius:4px;
          display:flex;
          align-items:center;
          justify-content:center;
          letter-spacing:2px;
          
          
      }
    .count-down-input{
        display:flex;
        flex-direction:column;
        background: rgb(245, 245, 245);
        padding:10px;

    }
     label{
        margin-bottom:10px;
     }
    .text-input{
        background:#fff;
    }
    .loader{
      margin-right:5px;
      margin-top:4px;
    }
    .foo-bar{
      width:200px;
      letter-spacing:2px;
    }

  

`
const LoadingContainer = styled.div`
      display:flex;
      justify-content:center;
      margin-top:80px;
`



