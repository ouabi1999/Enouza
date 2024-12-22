import React, {useRef, useState} from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';

export default function DisplaySlider({formData, setFormData}) {
    const RefInput =  useRef()
    const [slider, setSlider] = useState([]);

    const  handleImageChange = (e) => {
        e.preventDefault();
        if(e.target.files){
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setFormData(
                        {
                            ...formData,
                            slider : [...formData.slider, reader.result]

                        })
                    
                }
               
            };
            reader.readAsDataURL(e.target.files[0]);
            
        }


    }

    const handleImageInput = () =>{
        RefInput.current.click();

    }
    const removeImg = (index)=>{
        setFormData({
            ...formData,
            slider:  formData.slider.filter(x => x !== index)
        })

    }


    return (

        <Container>
            <label htmlFor='slider' > Main slider</label>
            <input
                type="file"
              
                ref={RefInput}
                
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
            />
            <div>
                <button
                    className="add-image"
                    name="imageinput"
                    id="imageinput"
                    onClick={handleImageInput}
                   
                 >
                    <AddPhotoAlternateIcon className="add_photo_icon" />
                </button>
            </div>
          

                {formData.slider?.map((img, index ) => {
                    return(
                        <div className="img-slider-container" key={index}>
                            <img src={img}  alt="slider img" />
                            <CancelIcon onClick={() => removeImg(img)} className="delete-icon" />
                        </div>
                    )

                })}  
                
            
        </Container>
    )
}
const Container = styled.div`

    width:600px;
    margin-top:10px;
    background: rgb(245, 245, 245);
    padding:10px;
    display:flex;
    flex-wrap:wrap;
    margin-right:10px;  
    min-height:200px;
    .img-slider-container{
        position:relative;
       
    }

    .img-slider-container img{
        width:200px;
        height:115px;
        margin-right:20px;
    }
    .delete-icon{
        position:absolute;
        top:-3%;
        right: 5%;
        cursor:pointer;
    }


`