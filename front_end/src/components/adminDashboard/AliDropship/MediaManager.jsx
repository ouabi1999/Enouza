import React, { useState } from "react";
import { Box, TextField, Button, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageThumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const VideoWrapper = styled.video`
  width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const MediaManager = ({ sku, skuIndex, editableProduct, setEditableProduct }) => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  // Add a new SKU image
  const addImage = () => {
    if (!newImageUrl) return;
    const newSkus = [...editableProduct.ae_item_sku_info_dtos];
    if (!newSkus[skuIndex].ae_sku_property_dtos) newSkus[skuIndex].ae_sku_property_dtos = [];
    newSkus[skuIndex].ae_sku_property_dtos.push({ sku_image: newImageUrl });
    setEditableProduct(prev => ({ ...prev, ae_item_sku_info_dtos: newSkus }));
    setNewImageUrl("");
  };

  // Remove an image by index
  const removeImage = (idx) => {
    const newSkus = [...editableProduct.ae_item_sku_info_dtos];
    newSkus[skuIndex].ae_sku_property_dtos.splice(idx, 1);
    setEditableProduct(prev => ({ ...prev, ae_item_sku_info_dtos: newSkus }));
  };

  // Update SKU video
  const updateVideo = () => {
    const newSkus = [...editableProduct.ae_item_sku_info_dtos];
    newSkus[skuIndex].ae_video_dtos = [{ media_url: newVideoUrl, poster_url: newVideoUrl }];
    setEditableProduct(prev => ({ ...prev, ae_item_sku_info_dtos: newSkus }));
    setNewVideoUrl("");
  };

  // Drag-and-drop handler for images
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newSkus = [...editableProduct.ae_item_sku_info_dtos];
    const items = Array.from(newSkus[skuIndex].ae_sku_property_dtos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    newSkus[skuIndex].ae_sku_property_dtos = items;
    setEditableProduct(prev => ({ ...prev, ae_item_sku_info_dtos: newSkus }));
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <h4>SKU Images</h4>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`sku-images-${skuIndex}`} direction="horizontal">
          {(provided) => (
            <Grid
              container
              spacing={1}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sku.ae_sku_property_dtos?.map((img, idx) => (
                <Draggable key={idx} draggableId={`img-${skuIndex}-${idx}`} index={idx}>
                  {(provided) => (
                    <Grid
                      item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Box position="relative">
                        <ImageThumb src={img.sku_image} alt={`sku-img-${idx}`} />
                        <IconButton
                          size="small"
                          onClick={() => removeImage(idx)}
                          sx={{ position: "absolute", top: -8, right: -8, background: "#fff" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add new image */}
      <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <Button variant="contained" size="small" onClick={addImage}>Add</Button>
      </Box>

      {/* SKU video */}
      <Box sx={{ marginTop: 2 }}>
        <h5>SKU Video</h5>
        {sku.ae_video_dtos?.[0] && (
          <VideoWrapper
            controls
            src={sku.ae_video_dtos[0].media_url}
            poster={sku.ae_video_dtos[0].poster_url}
          />
        )}
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Video URL"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <Button variant="contained" size="small" onClick={updateVideo}>Update</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaManager;

