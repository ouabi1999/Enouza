import React, { useEffect,useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

function Media({ setFormData, formData }) {
  const main_img_input = useRef();
  const additional_image_input = useRef()

 
  const removeMainImage = (index) => {
    setFormData((prev)=>({
      ...prev,
      images: { ...prev.images, main_image: null },
    }));
  };

  const remove_additional_Image = (index) => {
    const additional_images = formData.images.additional_images.slice();
    setFormData((prev)=>({
      ...prev,
      images: {
        ...prev.images,
        additional_images: additional_images.filter((x) => x !== index),
      },
    }));

    
  };

  // handle image input
  const handle_main_imageInput = (e) => {
    e.preventDefault();
    if (e.target.id === e.target.name) {
      return false;
    } else {
      main_img_input.current.click();
    }
  };
  const handle_additional_image_input = (e) => {
    e.preventDefault();
    if (e.target.id === e.target.name) {
      return false;
    } else {
      additional_image_input.current.click();
    }
  };


  /// handel image change
  const handle_additional_images_change = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData((prev)=>({
            ...prev,
            images: {
              ...prev.images,
              additional_images: [
                ...prev.images.additional_images,
                reader.result,
              ],
            },
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /// handel main image change
  const handle_main_image_change = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData((prev)=>({
            ...prev,
            images: {
              ...prev.images,
              main_image: reader.result,
            
            },
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Container>
        <label htmlFor="Preview image" style={{ fontFamily: "sans-serif" }}>
          {" "}
          Main Image
        </label>
        <div className="productImg-container">
          <input
            type="file"
            name="main-image"
            ref={main_img_input}
            id="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handle_main_image_change}
          />
          <div>
            <button
              className="add-image"
              name="main_imageinput"
              id="main_image"
              onClick={handle_main_imageInput}
              onChange={handle_main_image_change}
            >
              <AddPhotoAlternateIcon className="add_photo_icon" />
            </button>
          </div>

          {formData.images?.main_image && (
              <div>
                <img
                  src={formData.images?.main_image}
                  alt="img"
                  className="imgprview"
                  onClick={handle_main_imageInput}
                />
                <span className="remove_image" onClick={removeMainImage}>
                  x
                </span>
              </div>
            )}
        </div>
      </Container>

      <Container>
        <label htmlFor="Preview image" style={{ fontFamily: "sans-serif" }}>
          {" "}
          additional Images
        </label>
        <div className="productImg-container">
          <input
            type="file"
            name="additional-image"
            ref={additional_image_input}
            id="additional-image"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handle_additional_images_change}
          />
          <div>
            <button
              className="add-image"
              name="additional-image-input"
              id="additional-image"
              onClick={handle_additional_image_input}
              onChange={handle_additional_images_change}
            >
              <AddPhotoAlternateIcon className="add_photo_icon" />
            </button>
          </div>

          {formData.images?.additional_images?.map((img) => {
            return (
              <div key={img.index}>
                <img
                  src={img}
                  alt="img"
                  className="imgprview"
                  onClick={handle_additional_image_input}
                />
                <span className="remove_image" onClick={() => remove_additional_Image(img)}>
                  x
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Media;
const Container = styled.div`
  background: #ffff;
  padding: 10px;
  border-radius: 6px;
  margin: 15px 0;
  border: 1px solid lightgray;

  .productImg-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .remove_image {
    cursor: pointer;
    background: lightgrey;
    border-radius: 50%;
    padding: 2px 10px;
    font-size: 16px;
    color: red;
    position: relative;
    top: -143px;
    right: 13px;
  }

  .imgprview {
    margin-left: 5px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 1px solid lightblue;
  }
  button {
    background: 0;
  }
  .add_photo_icon {
    font-size: 10rem;
    color: lightgray;
  }
`;
