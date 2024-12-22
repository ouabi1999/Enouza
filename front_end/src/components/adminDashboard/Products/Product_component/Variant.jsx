import React from 'react'
import styled from 'styled-components';
import {TextField}  from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
function Variant({formData, setFormData, handelChange}) {

     /// add colors
     const addHeight = (e) => {
        if (e.key === "Enter") {
          if (e.target.value.length > 0) {
            setFormData({
              ...formData,
              heights: [...formData.colors, e.target.value],
            });
            e.target.value = "";
          }
        
        }
      };
      const addWidth = (e) => {
        if (e.key === "Enter") {
          if (e.target.value.length > 0) {
            setFormData({
              ...formData,
              widths: [...formData.colors, e.target.value],
            });
            e.target.value = "";
          }
        
        }
      };
      //remove colors
      const removeColors = (color) => {
        const colors = formData.colors.slice();
        setFormData({
          ...formData,
          colors: colors.filter((x) => x !== color),
        });
      };
     
  
      ///remove size
      const removeSize = (size) => {
        const sizes = formData.sizes.slice();
        setFormData({
          ...formData,
          sizes: sizes.filter((x) => x !== size),
        });
      };
      ///add size
      const addSize = (e) => {
        if (e.key === "Enter") {
          if (e.target.value.length > 0) {
            setFormData({
              ...formData,
              sizes: [...formData.sizes, e.target.value],
            });
            e.target.value = "";
          }
        }
      };


  return (
        <Container>
            <h4>Variant</h4>
            
      <div className="size-container">
        {formData.sizes?.map((size, index) => {
          return (
            <div key={index} className="size_wrapper">
              <span className="size_name">{size} </span>

              <CancelIcon onClick={() => removeSize(size)} className="remove-icon " />

            </div>
          );
        })}
                
                <TextField
                    label ="Size"
                    className="size-input"
                    type="text"
                    onKeyDown={addSize}
                    onChange={handelChange}
                />
            </div>
        </Container>
    )
}

export default Variant

 const Container = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 5px 10px;
    h4{
      margin:10px 0px;
      font-family:sans-serif;
    }
    .size-container,
    .colors-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
     
     

      .size_wrapper,
      .color_wrapper {
        display: flex;
        align-items: center;
        margin-bottom:15px;
        position:relative;

        .size_name,
        .color_name {
          padding: 0px 5px;
          background-color:#000;
          color: white;
          border-radius: 4px;
          margin-right: 10px;
          margin-bottom: 2px;
          
        }
        
      }
      .remove-icon{
        cursor: pointer;
        position:absolute;
        box-shadow: 2px 4px 4px  rgb(0, 0, 0, 0.45);
        background:#fff;
        border-radius:50%;
        color:red;
        font-size:15px;
        top:-8px;
        right:2px;
        z-index:1;
      }
    };
  `;


