import React, { useRef, useState } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";

const ratings = [1, 2, 3, 4, 5];

function Feedback({
  handelRatingSubmit,
  setComment,
  required,
  set_star_rating,
  isLoading,
  submitError,
  star_rating,
  comment,
  t,
}) {
  const [hoverValue, setHoverValue] = useState(null);
  const [isReadingImage, setIsReadingImage] = useState(false);
  const imageInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    setIsReadingImage(true);
    reader.onload = () => {
      setComment((current) => ({
        ...current,
        images: [...current.images, reader.result],
      }));
    };
    reader.onloadend = () => setIsReadingImage(false);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLoading && !isReadingImage) handelRatingSubmit();
  };

  return (
    <ReviewForm onSubmit={handleSubmit} aria-label={t("productInfo.give_us_your_feedback")}>
      <h3>{t("productInfo.give_us_your_feedback")}</h3>

      <div className="stars" onMouseLeave={() => setHoverValue(null)}>
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            className={(hoverValue ?? star_rating) >= rating ? "selected" : undefined}
            aria-label={`${rating} ${t(rating === 1 ? "productInfo.star" : "productInfo.stars")}`}
            aria-pressed={star_rating === rating}
            disabled={isLoading}
            onMouseEnter={() => setHoverValue(rating)}
            onClick={() => set_star_rating(rating)}
          >
            <StarIcon />
          </button>
        ))}
      </div>

      <textarea
        value={comment.text}
        placeholder={t("productInfo.comment")}
        aria-label={t("productInfo.comment")}
        aria-required="true"
        aria-invalid={required}
        disabled={isLoading}
        onChange={(event) => {
          const text = event.target.value;
          setComment((current) => ({ ...current, text }));
        }}
      />

      <div className="photos">
        <input type="file" ref={imageInput} hidden accept="image/*" onChange={handleImageChange} />
        <button
          type="button"
          className="photo-button"
          aria-label={t("productInfo.add_photo", { defaultValue: "Add photo" })}
          disabled={isLoading || isReadingImage}
          onClick={() => imageInput.current.click()}
        >
          <AddPhotoAlternateIcon />
        </button>
        {comment.images.map((image, index) => (
          <img key={index} src={image} alt="" width="44" height="44" />
        ))}
      </div>

      {required && <p role="alert">{t("common.text_field_required")}</p>}
      {submitError && <p role="alert">{t("errors.unknown_error")}</p>}

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading || isReadingImage}
        aria-busy={isLoading}
      >
        {isLoading && <CircularProgress size={16} color="inherit" />}
        {t("common.submit")}
      </button>
    </ReviewForm>
  );
}

export default Feedback;

const ReviewForm = styled.form`
  display: grid;
  gap: 12px;
  max-width: 650px;
  margin-block-start: 28px;
  padding: clamp(16px, 4vw, 24px);
  border: 1px solid #e6e0d7;
  border-radius: 10px;
  background: #fff;

  @media (max-width: 540px) {
    margin-inline: calc(-1 * var(--reviews-gutter, 0px));
    border-inline: 0;
    border-radius: 0;
  }

  h3 {
    margin: 0;
    font: 400 24px / 1.25 Georgia, serif;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
  }

  :is(button, textarea):focus-visible {
    outline: 2px solid #806547;
    outline-offset: 2px;
  }

  .stars,
  .photos {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .stars button,
  .photo-button {
    display: grid;
    place-items: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #81786b;
  }

  .stars .selected {
    color: #9a6b1c;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 120px;
    padding: 12px;
    border: 1px solid #d9d0c4;
    border-radius: 6px;
    background: #faf8f5;
    color: inherit;
    font: inherit;
    resize: vertical;
  }

  .photo-button {
    border: 1px solid #e6e0d7;
    border-radius: 6px;
  }

  img {
    border-radius: 6px;
    object-fit: cover;
  }

  p {
    margin: 0;
    color: #9b2e27;
    font-size: 13px;
  }

  .submit-button {
    display: inline-flex;
    justify-self: start;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 124px;
    min-height: 44px;
    padding-inline: 16px;
    border: 0;
    border-radius: 6px;
    background: #29251f;
    color: #fff;
    font: inherit;
  }

  .submit-button:disabled {
    background: #514a42;
  }
`;
