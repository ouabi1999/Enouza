import React, { Component, useState, createRef, useEffect } from "react";
import styled from "styled-components";

import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { Button as MUIButton } from '@mui/material';

import ApiInstance from "../../../../common/baseUrl";
import Stepper from "./Product_component/Stepper"
import AliExpressAuth from "../AliDropship/AliExpressAuth";
import AliExpressProductFetcher from "../AliDropship/AliExpressProductFetcher";
import { useSelector } from "react-redux";


function ProductManagement(props) {
  const productData = useSelector((state) => state.aliExpressProduct.product);
   const [formData, setFormData] = useState({
  product_id: "",
  name: { en:"", fr:"", es:"", ar:"" },
  description: { en:"", fr:"", es:"", ar:"" },
  brand: "",
  skuInfo: [],
  specifications: [],
  multimediaInfo: [],
  in_stock: true,
  category: "",
  tags: [],
  warranty: "",
  care_instructions: "",
  sale_end_date: "",
  available_shipping: [],
  return_policy: "",
  country_of_origin: "",
  social_media_links: { facebook: "", instagram: "" },
  ali_express_ratings: []
}
);

  useEffect(() => {
  if (productData) {
    const sku_info_slice = productData.ae_item_sku_info_dtos?.map(sku => ({
      color: sku.ae_sku_property_dtos?.[0]?.sku_property_value || "",
      size: sku.ae_sku_property_dtos?.[1]?.sku_property_value || "",
      image: sku.ae_sku_property_dtos?.[0]?.sku_image || null,
      cost: sku.offer_sale_price || 0,
      sellingPrice: "",
      profitPrice: "",
      comparePrice: "",
      sku_attr: sku.sku_attr|| "",
      shipping: ""
    }));
    setFormData((prev) => ({
      ...prev,
      product_id: productData.ae_item_base_info_dto?.product_id || "",
      name: {
        ...prev.name,
        en: productData.ae_item_base_info_dto?.subject || "",
      },

      description: {
        ...prev.description,
        en: productData.ae_item_base_info_dto?.detail || "",
      },

      skuInfo: sku_info_slice || [],
      multimediaInfo:  productData.ae_multimedia_info_dto || [],
      
    }));
  } 
  console.log("Form Data Updated:", formData);
}, [productData]);



 

  const [loading, setLoading] = useState(false);

  const { close_Modal, isEditProductOn, EditProduct, isAddProductOn } = props;


  useEffect(() => {
    if (isEditProductOn) {
      setFormData({ ...EditProduct })
    }

  }, [])

  /// send products info to the backend
  const product_submit = (value) => {
    const data = new FormData();
    console.log(formData)    
    formData.tags?.forEach((tag) => data.append("tags", tag));

    formData.ali_express_ratings?.forEach((rating) =>
      data.append("ali_express_ratings", JSON.stringify(rating))
    );

    data.append("available_shipping", JSON.stringify(formData.available_shipping))

    // Append nested objects like specifications, images, social_media_links, etc.
    data.append("specifications", JSON.stringify(formData.specifications));
    // Append `main_image` as a file if it exists



   
      data.append("skuInfo", JSON.stringify(formData.skuInfo));

    data.append("social_media_links", JSON.stringify(formData.social_media_links));

    // Append individual fields
    data.append("name", JSON.stringify(formData.name));
    data.append("description", JSON.stringify(formData.description));
    data.append("multimediaInfo", JSON.stringify(formData.multimediaInfo));
    data.append("brand", formData.brand);
    data.append("product_id", formData.product_id);

    data.append("SKU", formData.SKU);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("quantity", formData.quantity);
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

    isEditProductOn && ApiInstance.put(`product-details/${value.id}/`, data)

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
      <ButtonsContainer>
        <AliExpressAuth />
        <AliExpressProductFetcher />


        <SubmitButton
          type="submit"
          onClick={() => product_submit(formData)}
          variant="contained"
          className="submitButton"
          disabled={loading}
        >
          <span>
            {" "}
            {isEditProductOn && "Update Product"}{" "}
            {isAddProductOn && "Push to store"}
          </span>
          {loading && (
            <CircularProgress
              style={{ marginLeft: "3px" }}
              size={22}
              thickness={6}
              value={100}
            />
          )}
        </SubmitButton>
      </ButtonsContainer>

      <Stepper
        setFormData={setFormData}
        formData={formData}
        handelChange={handelChange}
      />

    </AddNew_Product>
  );
}
export default ProductManagement;

const AddNew_Product = styled.div`
  position: relative;

  .loader {
    position: absolute;
    top: 50%;
    right: 50%;
  }

 
  .exit-button {
    cursor: pointer;
  }
`
const ButtonsContainer = styled.div`
display:flex;
justify-content:space-between;
`

const SubmitButton = styled.button`
  background-color: #00ad3cfc !important;
  color: #fff !important;
  font-weight: 600 !important;
  padding: 10px 24px !important;
  border-radius: 8px !important;
  text-transform: none !important;
  transition: background 0.3s !important;
  margin-bottom: 15px;

  &:hover {
    background-color: #00ad3daa  !important;
  }

  &:disabled {
    background-color: #9ca3af !important;
    color: #f3f4f6 !important;
  }
`;