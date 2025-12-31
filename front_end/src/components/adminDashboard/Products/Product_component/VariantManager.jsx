import React, { useState , useEffect, useRef} from 'react';
import styled from 'styled-components';

export default function VariantManager({ formData, setFormData}) {
  const [variants, setVariants] = useState([]);
  const ref = useRef()
 
 
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      skuInfo: [...prev.skuInfo, {
      color: '',
      size: '',
      image: "",
      cost: 0,
      sellingPrice: 0,
      profitPrice: 0,
      comparePrice: 0,
      sku_attr: '',
      shipping: ''
    }]
    }))
  };

 const updateVariant = (id, keyName, value) => {
  setFormData(prev =>({
      ...prev,
      skuInfo: prev.skuInfo.map(v => 
        v.sku_attr === id ? {...v, [keyName]: value} : v
      
      )

 }));
};


  const handleImageUpload = (id, files) => {
    const urls = Array.from(files).map(f => URL.createObjectURL(f));
    updateVariant(id, 'image', urls[0]);
   
  };

  const deleteVariant = (id) => {
    setFormData(prev => ({
      ...prev,
      skuInfo: prev.skuInfo.filter(v => v.sku_attr !== id)
    }))
  };

  return (
    <Wrapper>
      <Header>
        <Title>Variants</Title>
        <AddButton onClick={addVariant}>Add New Variant</AddButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <TH>Image</TH>
            <TH>Color</TH>
            <TH>Size</TH>
            <TH>Cost</TH>
            <TH>Selling</TH>
            <TH>Compare</TH>
            <TH>Shipping</TH>
            <TH>Profit</TH>
            <TH>Stock</TH>
            <TH>Delete</TH>
          </tr>
        </thead>
        <tbody>
          {formData.skuInfo?.map((v, key)=> (
            
            <tr key={key}>
              <TD>
                <Input  id={`file-${v.sku_attr}`} style={{display:"none"}} type="file" multiple onChange={e => handleImageUpload(v.sku_attr, e.target.files)} />
                <ImagePreviewContainer  onClick={() => document.getElementById(`file-${v.sku_attr}`).click()} >
                  <ImagePreview alt="" src={v.image} />
                </ImagePreviewContainer>
              </TD>
              <TD><Input value={v.color} type='text' onChange={e => updateVariant(v.sku_attr, 'color', e.target.value)} /></TD>
              <TD><Input value={v.size} type ="text" onChange={e => updateVariant(v.sku_attr, 'size', e.target.value)} /></TD>
              <TD><Input type="number" value={v.cost} onChange={e => updateVariant(v.sku_attr, 'cost', e.target.value)} /></TD>
              <TD><Input type="number" value={v.sellingPrice} onChange={e => updateVariant(v.sku_attr, 'sellingPrice', e.target.value)} /></TD>
              <TD><Input type="number" value={v.comparePrice} onChange={e => updateVariant(v.sku_attr, 'comparePrice', e.target.value)} /></TD>
              <TD><Input type="number" value={v.profitPrice} onChange={e => updateVariant(v.sku_attr, 'profitPrice', e.target.value)} /></TD>
              <TD><Input value={v.shipping} onChange={e => updateVariant(v.sku_attr, 'shipping', e.target.value)} /></TD>
              <TD><Input value={v.available_stock} onChange={e => updateVariant(v.sku_attr, 'available_stock', e.target.value)} /></TD>
              <TD><DeleteButton onClick={() => deleteVariant(v.sku_attr)}>Delete</DeleteButton></TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #111827;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #10b981;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover { background-color: #059669; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TH = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #e5e7eb;
  color: #374151;
  font-weight: 600;
`;

const TD = styled.td`
  padding: 10px;
  border-bottom: 1px solid #d1d5db;
  vertical-align: middle;
`;

const Input = styled.input`
  width: 80%;
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #ef4444;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover { background-color: #dc2626; }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  margin-top: 6px;
  gap: 6px;
`;

const ImagePreview = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  `