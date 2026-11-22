import React, { useEffect, useState, useRef } from 'react'
import CustomerReviews from './CustomerReviews'
import Feedback from './FeedBack'
import { useSelector } from 'react-redux'
import ApiInstance from '../../../../../common/baseUrl'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Ratings from './Ratings'

function ReviewsLayout() {
  const productData = useSelector(state => state.product.productData)
  const user = useSelector(state => state.auth.user)
  const [comment, setComment] = useState({ images: [], text: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [reviewsVersion, setReviewsVersion] = useState(0);
  const [submitError, setSubmitError] = useState(false);
  const [required, setRequired] = useState(false)
  const [loading, setLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)

  const reviewsTopRef = useRef(null);

  const PAGE_SIZE = 6;
  const { t, i18n } = useTranslation()

  const [star_rating, set_star_rating] = useState(1);
  const [ratings, setRatings] = useState([])

const fiveStars = productData?.five_star_count ?? 0;
const fourStars = productData?.four_star_count ?? 0;
const threeStars = productData?.three_star_count ?? 0;
const twoStars = productData?.two_star_count ?? 0;
const oneStar = productData?.one_star_count ?? 0;

let sum_stars = Number(productData?.average_rating).toFixed(1) || 0


  const handelRatingSubmit = async () => {
    if (isLoading || !productData?.id || !user?.id) return;

    setSubmitError(false);
    const text = comment.text.trim();
    setRequired(!text);
    if (!text) return;

    setIsLoading(true);
    try {
      await ApiInstance.post("ratings/", {
        product: productData.id,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          countryCode: user.countryCode,
        },
        stars: star_rating,
        review: { ...comment, text },
      });

      setComment({ text: "", images: [] });
      set_star_rating(1);
      setCurrentPage(1);
      setReviewsVersion((version) => version + 1);
      if (currentPage === 1) {
        reviewsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      console.error("Failed to submit product review:", error);
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!productData?.id) {
      setRatings([]);
      setTotalReviews(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchReviews = async () => {
      setLoading(true);

      try {
        const { data } = await ApiInstance.get("product_ratings", {
          params: {
            product_id: productData.id,
            page: currentPage,
            page_size: PAGE_SIZE,
          },
        });

        if (!mounted) return;

        const results = Array.isArray(data?.results) ? data.results : [];
        const count = Number(data?.count ?? 0);

        setRatings(results);
        setTotalReviews(count);
        if (data.rating_counts) {
          setRatingSummary({ productId: productData.id, count, buckets: data.rating_counts });
        }
        setTotalPages(
          Number(data?.total_pages) || Math.max(1, Math.ceil(count / PAGE_SIZE))
        );
      } catch (error) {
        if (!mounted) return;

        console.error("Failed to fetch product reviews:", error.response?.data || error);

        setRatings([]);
        setTotalReviews(0);
        setTotalPages(1);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, [productData?.id, currentPage, reviewsVersion]);

  const previousPageRef = useRef(currentPage);

  useEffect(() => {
    if (previousPageRef.current !== currentPage) {
      previousPageRef.current = currentPage;
      reviewsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

  }, [currentPage]);



  return (
    <Container>
      <div ref= {reviewsTopRef}>
      <Ratings fiveStars={fiveStars}
        twoStars={twoStars}
        fourStars={fourStars}
        threeStars={threeStars}
        oneStar={oneStar}
        productData={productData}
        ratingSummary={ratingSummary?.productId === productData?.id ? ratingSummary : null}
        sum_stars={sum_stars}
        ratings={ratings}
        t={t}
        i18n={i18n} />
        </div>


        <CustomerReviews
          fiveStars={fiveStars}
          twoStars={twoStars}
          fourStars={fourStars}
          threeStars={threeStars}
          oneStar={oneStar}
          productData={productData}
          sum_stars={sum_stars}
          ratings={ratings}
          totalReviews={totalReviews}
          totalPages={totalPages}
          currentPage={currentPage}
          loading={loading}
          setCurrentPage={setCurrentPage}
          t={t}
          i18n={i18n}
        />
      {user?.is_staff && (
        <Feedback
          comment={comment}
          setComment={setComment}
          isLoading={isLoading}
          submitError={submitError}
          required={required}
          star_rating={star_rating}
          set_star_rating={set_star_rating}
          handelRatingSubmit={handelRatingSubmit}
          t={t}
          i18n={i18n}
        />

      )}
    </Container>

  )
}

export default ReviewsLayout
const Container = styled.div`
  --reviews-gutter: 32px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px var(--reviews-gutter) 64px;
  box-sizing: border-box;
  color: #29251f;

  @media (max-width: 768px) {
    --reviews-gutter: 20px;
    padding-block: 52px 60px;
  }

  @media (max-width: 480px) {
    --reviews-gutter: 16px;
    padding-block: 42px 50px;
  }
`
