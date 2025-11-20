import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";

const EditorWrapper = styled.div`
  .ql-container {
    border-radius: 8px;
    min-height: 200px;
  }
`;

const DescriptionEditor = ({ product, setProduct }) => {
  const handleChange = (value) => {
    setProduct(prev => ({ ...prev, ae_item_base_info_dto: { ...prev.ae_item_base_info_dto, detail: value } }));
  };

  return (
    <EditorWrapper>
      <h2>Product Description</h2>
      <ReactQuill
        theme="snow"
        value={product.ae_item_base_info_dto.detail || ""}
        onChange={handleChange}
      />
    </EditorWrapper>
  );
};

export default DescriptionEditor;
