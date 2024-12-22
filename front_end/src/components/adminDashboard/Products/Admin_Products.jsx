import React, { Component, useState } from 'react'
import styled from 'styled-components'

import Spinner from "../../../../common/Spinner"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function adminProducts(props){
  

  const myRef = React.createRef();
  const [index, setIndex] = useState(0)

  const handleTab = index => {
    setIndex( index)
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].classnNameName = images[i].classnNameName.replace("active", "");
    }
    images[index].classnNameName = "active";
  };
  const handFirstProduct = () => {
    myRef.current.children[index].classnNameName = "active";
  }
    
  
  const { isLoading , products, open_add_rating, open_addProduct_Modal, AdminProducts, deleteProduct, open_Edit_Modal } = props;

    return (
      <>
        {isLoading  === false ? ( 


        
       
        <Product_Container>
          <button  className="addproduct-button" onClick={ open_addProduct_Modal}>Add New Product</button>
          <TableWrap>
            
            {products?.map((product) => {
                return (
                    <div  key={product.id} className="container">
                      <div>
                        <button className="edit-button" onClick={() => open_add_rating(product)}>add rating</button>
                      </div>
                      <div className="img-container">
                        <a href={"#" + product.id} onClick={() => openModal(product)}>
                          <img width="80" height="90" src={product.images?.additional_images[0]} alt="productImage" />
                        </a>
                        <div className="product-id">
                        <span>{product.id}</span>
                      </div>
                      </div>
                      
                      <div className="product-price">
                        <span>US ${product.price}</span>
                      </div>
                      <div className="product-quantity">
                        <span>{product.quantity} Piece</span>
                      </div>

                      
                      <div className="edit-btn-container">
                        <EditIcon  className="edit-btn" onClick={() => open_Edit_Modal(product)}/>
                      </div>
                      <div className="delete-btn-container">
                        <DeleteIcon className="delete-btn" onClick={() => deleteProduct(product.id)}/>
                      </div>
                    </div>
                    )})}
                    </TableWrap>
                  </Product_Container>
           
           ): <div style={{margin:"auto"}}>
            <Spinner/>
            
            </div>}
          
      
     
     
      </>
    )
  }


const Product_Container = styled.div`
   width:100%;
  .container{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    margin-top:10px;
    padding:10px;
    border-radius:4px;


  }
  .addproduct-button{
    background: #000;
    color:#fff;
    padding:10px;
    border-radius:4px;
  }
  .img-container{
    display:flex;
    align-items:center;
    width:480px;
     
  }
  .img-container img{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius:4px;
    margin-right:10px;
  }
  .product-price{
     font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  .product-quantity{

  }
  .delete-btn-container{

  }
  .edit-btn-container{

  }
  .delete-btn, .edit-btn{
    cursor:pointer;
    color:gray;
  }

  .delete-btn:hover, .edit-btn:hover{
    opacity:0.5;
  }
      
`

const TableWrap = styled.div`

 

`
