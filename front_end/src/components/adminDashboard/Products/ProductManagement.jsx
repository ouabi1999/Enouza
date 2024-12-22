import React, { Component, useState, createRef, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Tags from "./Product_component/Tags";
import Inventory from "./Product_component/Inventory";
import Pricing from "./Product_component/Pricing";
import Description from "./Product_component/Description";
import Shipping from "./Product_component/Shipping";
import Organization from "./Product_component/Organization";
import Variant from "./Product_component/Variant";
import ProductTitle from "./Product_component/ProductTitle";
import Media from "./Product_component/Media";
import Color from "./Product_component/Color";
import ApiInstance from "../../../../common/baseUrl";
import Specifications from "./Product_component/Specifications";

 
function ProductManagement(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    SKU: "",
    price: "",
    discount: "",
    sizes: [],
    colors: [],
    specifications: [],
    images: {
      main_image: null,
      additional_images: [],
    },
    quantity: 0,
    inStock: true,
    tags: [],
    seo: [],
    warranty: "",
    care_instructions: "",
    sale_end_date: null,
    available_shipping: [],
    return_policy: "",
    country_of_origin: "",
    social_media_links: { facebook: "", instagram: "" },
    ali_express_ratings: [],
  });
  const [loading, setLoading] = useState(false);

  const { close_Modal, isEditProductOn, EditProduct,  isAddProductOn} = props;

  
  useEffect(()=>{
      if (isEditProductOn){
        setFormData({...EditProduct, specifications :[], })
      }
     
    },[])
    
  /// send products info to the backend
  const product_submit = (value) => {
    const data = new FormData();
    console.log(formData)
    // Append arrays (sizes, colors, tags, available_shipping, ali_express_ratings) using forEach
    formData.sizes?.forEach((size) => data.append("sizes", size));
    formData.colors?.forEach((color) => data.append("colors", color));
    formData.tags?.forEach((tag) => data.append("tags", tag));
   
    formData.ali_express_ratings?.forEach((rating) =>
      data.append("ali_express_ratings", JSON.stringify(rating))
    );
   
      data.append("available_shipping", JSON.stringify(formData.available_shipping))
    
    // Append nested objects like specifications, images, social_media_links, etc.
    data.append("specifications", JSON.stringify(formData.specifications));
    // Append `main_image` as a file if it exists
   
    data.append("main_image", formData.images.main_image); // Assuming main_image is a file
    

    // Append each `additional_image` as a separate file
    formData.images?.additional_images?.forEach((file, index) => {
      data.append("additional_images", file); // Assuming each additional image is a file
    });

    data.append(
      "social_media_links",
      JSON.stringify(formData.social_media_links)
    );

    // Append individual fields
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("brand", formData.brand);
    data.append("SKU", formData.SKU);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("quantity", formData.quantity);
    data.append("inStock", formData.inStock);
    data.append("warranty", formData.warranty);
    data.append("care_instructions", formData.care_instructions);
    data.append("sale_end_date", formData.sale_end_date);
    data.append("return_policy", formData.return_policy);
    data.append("country_of_origin", formData.country_of_origin);
    data.append("global_coupon", formData.global_coupon);
  
    // Append SEO (which might be an array of objects or just simple strings)
    formData.seo?.forEach((seoItem) =>
      data.append("seo", JSON.stringify(seoItem))
    );
  

    // Append all data from formData to FormData
    setLoading(true);
    isAddProductOn && ApiInstance.post("product-api/", data)

      .then((response) => {
        setLoading(false);
        toast.success("A new Product has been added .");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Oops something went wrong!");
        setLoading(false);
      });

    isEditProductOn && ApiInstance.put(`product-details/${value.id}/`,data)
    
    .then((response) => {
      setLoading(false);
      toast.success("A Product has been updated .");
      return response.data
    })
    .catch((err) => {
      console.log(err);
      toast.error("Oops something went wrong!");
      setLoading(false);
    })
    
    
    
    
  };


  
  // handle change input
  const handelChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <AddNew_Product>
      {loading && (
        <div className="loader">
          <CircularProgress size={25} thickness={4} />
        </div>
      )}

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
      />
      <Left_container id="useform">
        <div className="exit-button-container">
          <CancelIcon
            className="exit-button"
            onClick={close_Modal}
          />
        </div>
        <div className="wrapper">
          <ProductTitle
            formData={formData}
            setFormData={setFormData}
            handelChange={handelChange}
          />
          <Media formData={formData} setFormData={setFormData} />

          <Color formData={formData} setFormData={setFormData} />

          <Description
            setFormData={setFormData}
            formData={formData}
            handelChange={handelChange}
          />
          <Specifications
            setFormData={setFormData}
            formData={formData}
            handelChange={handelChange} />
        </div>

        <Pricing formData={formData} handelChange={handelChange} />

        <Button
          type="submit"
          onClick={()=> product_submit(formData)}
          variant="contained"
          className="submitButton"
          disabled={loading}
        >
          <span>
            {" "}
            {isEditProductOn && "Update Product"}{" "}
            {isAddProductOn && "add product"}
          </span>
          {loading && (
            <CircularProgress
              style={{ marginLeft: "3px" }}
              size={22}
              thickness={6}
              value={100}
            />
          )}
        </Button>
      </Left_container>
      <Right_container>
        <Inventory
          formData={formData}
          handelChange={handelChange}
          setFormData={setFormData}
        />

        <Shipping
          formData={formData}
          handelChange={handelChange}
          setFormData={setFormData}
        />
        <Organization
          formData={formData}
          handelChange={handelChange}
          setFormData={setFormData}
        />

        <Variant
          formData={formData}
          handelChange={handelChange}
          setFormData={setFormData}
        />

        <Tags
          formData={formData}
          handelChange={handelChange}
          setFormData={setFormData}
        />
      </Right_container>
    </AddNew_Product>
  );
}
export default ProductManagement;

const AddNew_Product = styled.div`
  display: flex;
  position: relative;

  .loader {
    position: absolute;
    top: 50%;
    right: 50%;
  }

  .submitButton {
    display: flex;
    padding: 10px 15px;
    background: goldenrod;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    margin: auto;
  }
  .exit-button {
    cursor: pointer;
  }
`;
const Left_container = styled.div`
  flex: 2;

  border-radius: 6px;
  padding: 10px;
  margin-right: 10px;
`;
const Right_container = styled.div`
  flex: 0.7;
  .text_input {
    width: 100%;
    background: #fff;
    margin-bottom: 15px;
  }
`;
