import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

const ImageWrapper = styled.img`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const VideoWrapper = styled.video`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MediaGallery = ({ product }) => {
  const images = product.ae_multimedia_info_dto.image_urls.split(";");
  const video =  false //product.ae_multimedia_info_dto.ae_video_dtos[0];

  return (
    <div>
      <h2>Media Gallery</h2>
      <Box>
        {images.map((url, idx) => (
          <ImageWrapper key={idx} src={url} alt={`product-${idx}`} />
        ))}
        {video && (
          <VideoWrapper controls poster={video.poster_url}>
            <source src={video.media_url} type="video/mp4" />
          </VideoWrapper>
        )}
      </Box>
    </div>
  );
};

export default MediaGallery;
