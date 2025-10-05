import styled from 'styled-components'
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




function Description({ formData, setFormData }) {

 
  const handleChangeEng = (content, delta, source, editor) => {
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setFormData(prev=>({
      ...prev,
      description: {...prev.description, "en":editor.getHTML()}
    }))
    

  };
  const handleChangeAr = (content, delta, source, editor) => {
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setFormData(prev=>({
      ...prev,
      description: {...prev.description, "ar":editor.getHTML()}
    }))
    

  };
  const handleChangeEs = (content, delta, source, editor) => {
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    
    setFormData(prev=>({
      ...prev,
      description: {...prev.description, "es":editor.getHTML()}
    }))
    

  };
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],

      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],

  };

  const formats = [
    'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
    "table",
    "size",

  ];


  return (
    <Container>

      <label htmlFor="Description" style={{ fontFamily: "sans-serif" }}>Description english</label>
      <ReactQuill
        theme="snow"
        value={formData.description.en}
        onChange={handleChangeEng}
        modules={modules}
        formats={formats}


      />
      <label htmlFor="Description" style={{ fontFamily: "sans-serif" }}>Description spanish</label>
      <ReactQuill
        theme="snow"
        value={formData.description.es}
        onChange={handleChangeEs}
        modules={modules}
        formats={formats}


      />

      <label htmlFor="Description" style={{ fontFamily: "sans-serif" }}>Description arabic</label>
      <ReactQuill
        theme="snow"
        value={formData.description.ar}
        onChange={handleChangeAr}
        modules={modules}
        formats={formats}


      />
    </Container>
  )
}

export default Description

const Container = styled.div`
     background-color:#fff;
     min-height:150px;
     padding:10px;
   

    
     
      .toolbar-class {
          border: 1px solid #ccc;
 }

  `