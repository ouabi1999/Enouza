
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";

import ApiInstance from "../../common/baseUrl";
import CollectionProducts from "../components/Home/Sections/CollectionProducts.jsx";
import { setSort } from "../features/filterSlice";
import SEO from "../components/SEO/SEO";

/* ============================================================
   HEADER IMAGE
============================================================ */

const cover_image =
  "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1790529844/ChatGPT_Image_Sep_27_2026_07_23_04_PM_csaple.png";

/* ============================================================
   ANIMATIONS
============================================================ */

const pageReveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const productsReveal = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ============================================================
   COMPONENT
============================================================ */

export default function FilterPageStyled() {
  const [productsList, setProductsList] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sort = useSelector((state) => state.filter.sort);
  const categories = useSelector((state) => state.filter.categories);
  const search = useSelector((state) => state.filter.search);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  /* ============================================================
     FETCH PRODUCTS
  ============================================================ */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const response = await ApiInstance.get("product-search/", {
          params: {
            search: search || "",
            category: categories?.join(",") || "",
            sort: sort || "best_match",
            page: count,
            per_page: 12,
          },
        });

        if (!isMounted) return;

        setProductsList(response.data.results || []);
        setTotalPages(response.data.total_pages || 0);
      } catch (error) {
        if (!isMounted) return;

        console.error("Error fetching products:", error);
        setProductsList([]);
        setTotalPages(0);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [search, categories, sort, count]);

  /* ============================================================
     RESET PAGINATION WHEN FILTERS CHANGE
  ============================================================ */

  useEffect(() => {
    setCount(1);
  }, [search, categories, sort]);

  /* ============================================================
     SCROLL TO TOP WHEN PAGE CHANGES
  ============================================================ */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [count]);

  /* ============================================================
     PRICE ARROW
  ============================================================ */

  const getPriceArrow = () => {
    if (sort === "price_asc") return "↑";
    if (sort === "price_desc") return "↓";
    return "↕";
  };

  return (
    <Page>
      <SEO
        title="Lamps and Home Lighting Collection | Enouza"
        description="Explore Enouza's curated collection of luxury lamps and premium home lighting, including elegant table lamps, wall lamps, and statement lighting."
        canonical="/collections"
      />

      {/* =====================================================
          COLLECTION HEADER
      ===================================================== */}

      <CollectionHeader
        as={motion.header}
        variants={pageReveal}
        initial="hidden"
        animate="visible"
      >

        <CollectionTitle>
          {t("filterPage.discover")}
        </CollectionTitle>

    <bdi>
        <CollectionDescription>
          {t("filterPage.collection_description")}
        </CollectionDescription>
  </bdi>
      </CollectionHeader>
      {/* =====================================================
          SORT CONTROLS
      ===================================================== */}

      <ControlsSection
        as={motion.section}
        variants={pageReveal}
        initial="hidden"
        animate="visible"
      >
        <ControlsInner>
          <SortWrapper>
            <bdi>
            <SortLabel>{t("common.sortBy")}</SortLabel>
              </bdi>
            <SortBarContainer>
              <SortButton
                type="button"
                $active={sort === "best_match"}
                onClick={() => dispatch(setSort("best_match"))}
              >
                {t("common.bestMatch")}
              </SortButton>

              <SortButton
                type="button"
                $active={sort === "orders"}
                onClick={() => dispatch(setSort("orders"))}
              >
                {t("common.orders")}
              </SortButton>

              <SortButton
                type="button"
                $active={
                  sort === "price_asc" ||
                  sort === "price_desc"
                }
                onClick={() =>
                  dispatch(
                    setSort(
                      sort === "price_asc"
                        ? "price_desc"
                        : "price_asc"
                    )
                  )
                }
              >
                {t("common.price")}

                <SortArrow
                  $direction={
                    sort === "price_desc" ? "desc" : "asc"
                  }
                >
                  {getPriceArrow()}
                </SortArrow>
              </SortButton>
            </SortBarContainer>
          </SortWrapper>
        </ControlsInner>
      </ControlsSection>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <ProductsSection>
        {isLoading ? (
          <SkeletonGrid>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index}>
                <Skeleton
                  variant="rectangular"
                  className="skeleton-image"
                />

                <SkeletonInfo>
                  <Skeleton
                    variant="text"
                    width="72%"
                    height={22}
                  />

                  <Skeleton
                    variant="text"
                    width="25%"
                    height={18}
                  />

                  <Skeleton
                    variant="text"
                    width="42%"
                    height={26}
                  />
                </SkeletonInfo>
              </SkeletonCard>
            ))}
          </SkeletonGrid>
        ) : productsList.length > 0 ? (
          <ProductGridWrapper
            as={motion.div}
            variants={productsReveal}
            initial="hidden"
            animate="visible"
          >
            <CollectionProducts
              columsNumber={4}
              products={productsList}
              placeItems="center"
            />
          </ProductGridWrapper>
        ) : (
          <EmptyState>
            <EmptyLogo>ENOUZA</EmptyLogo>
<bdi>
            <EmptyTitle>
              {t("filterPage.search_did_not_match")}
            </EmptyTitle>
            </bdi>

            <EmptyLine />
          </EmptyState>
        )}
      </ProductsSection>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={count}
            onChange={(_, value) => setCount(value)}
            shape="rounded"
            hidePrevButton
            hideNextButton
          />
        </PaginationWrapper>
      )}
    </Page>
  );
}

/* ============================================================
   PAGE
============================================================ */

const Page = styled.main`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px 90px;
  box-sizing: border-box;

  color: #161513;
  background: #faf8f5;

  @media (max-width: 1100px) {
    padding: 0 28px 70px;
  }

  @media (max-width: 700px) {
    padding: 0 16px 60px;
  }

  @media (max-width: 480px) {
    padding: 0 12px 50px;
  }
`;

/* ============================================================
   FULL-WIDTH COLLECTION HEADER
============================================================ */

const CollectionHeader = styled.header`
  position: relative;
  isolation: isolate;
  width: 100vw;
  max-width: 100vw;

  /* Extend beyond Page's horizontal padding */
  margin-left: calc(50% - 50vw);

  height: 500px;
  padding: 88px 20px 58px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  overflow: hidden;
  text-align: center;

  background-image:
    linear-gradient(
      180deg,
      
      rgba(20, 18, 15, 0.2) 100%
    ),
    url("${cover_image}");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-bottom: 1px solid rgba(255, 255, 255, 0.16);

  @media (max-width: 768px) {
    height: 340px;
    padding: 62px 18px 42px;
  }

  @media (max-width: 480px) {
    height: 270px;
    padding: 48px 14px 32px;
  }
`;

/* ============================================================
   HEADER EYEBROW
============================================================ */

const Eyebrow = styled.span`
  position: relative;
  z-index: 1;

  display: block;
  margin-bottom: 18px;

  color: #e7c99b;

  font-family: Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;

  letter-spacing: 0.3em;
  line-height: 1.6;
  text-transform: uppercase;

  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);

  @media (max-width: 480px) {
    margin-bottom: 13px;
    font-size: 0.57rem;
    letter-spacing: 0.23em;
  }
`;

/* ============================================================
   HEADER TITLE
============================================================ */

const CollectionTitle = styled.h1`
  position: relative;
  z-index: 1;

  max-width: 100%;
  margin: 0;

  color: #fffaf2;

  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400;

  letter-spacing: -0.035em;
  line-height: 1.08;
  text-transform: uppercase;
  text-wrap: balance;

  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    font-size: clamp(2rem, 7.5vw, 2.65rem);
  }

  @media (max-width: 400px) {
    font-size: 2rem;
  }
`;

/* ============================================================
   HEADER DECORATIVE LINE
============================================================ */

const HeaderLine = styled.div`
  position: relative;
  z-index: 1;

  width: 46px;
  height: 1px;
  flex-shrink: 0;

  margin: 24px auto 0;

  background: #d6b583;
`;

/* ============================================================
   HEADER DESCRIPTION
============================================================ */

const CollectionDescription = styled.p`
  position: relative;
  z-index: 1;

  width: min(100%, 590px);
  margin: 20px auto 0;

  color: rgba(255, 250, 242, 0.94);

  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;

  line-height: 1.8;
  letter-spacing: 0.015em;

  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: 600px) {
    max-width: 440px;
    margin-top: 16px;
    font-size: 0.72rem;
    line-height: 1.7;
  }
`;

/* ============================================================
   SORT CONTROLS SECTION
============================================================ */

const ControlsSection = styled.section`
  width: 100%;
  padding: 24px 0;

  border-bottom: 1px solid rgba(22, 21, 19, 0.07);
`;

const ControlsInner = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 18px;
`;

/* ============================================================
   SORT
============================================================ */

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 12px;
  width: 100%;

  color: #88837b;
  font-family: Arial, sans-serif;

  @media (max-width: 480px) {
    gap: 8px;
    justify-content: center;
  }
`;

const SortLabel = styled.span`
  flex-shrink: 0;

  color: #918d86;

  font-size: 0.59rem;
  font-weight: 400;

  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const SortBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 3px;
  padding: 3px;

  border: 1px solid rgba(22, 21, 19, 0.07);
  border-radius: 30px;

  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 2px 12px rgba(22, 21, 19, 0.025);
  backdrop-filter: blur(8px);

  @media (max-width: 480px) {
    max-width: calc(100vw - 90px);
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  min-height: 28px;
  padding: 7px 14px;

  border: none;
  border-radius: 30px;

  background: ${({ $active }) =>
    $active ? "#161513" : "transparent"};

  color: ${({ $active }) =>
    $active ? "#faf8f5" : "#77736d"};

  font-family: Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  letter-spacing: 0.035em;
  line-height: 1;
  white-space: nowrap;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease;

  &:hover {
    color: ${({ $active }) =>
      $active ? "#faf8f5" : "#161513"};

    background: ${({ $active }) =>
      $active ? "#161513" : "rgba(22, 21, 19, 0.055)"};
  }

  @media (max-width: 480px) {
    padding: 7px 11px;
    font-size: 0.57rem;
  }
`;

const SortArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-left: 5px;

  font-size: 10px;

  transition: transform 0.25s ease;

  transform: ${({ $direction }) =>
    $direction === "desc" ? "rotate(180deg)" : "rotate(0deg)"};
`;

/* ============================================================
   PRODUCTS
============================================================ */

const ProductsSection = styled.section`
  width: 100%;
  padding-top: 42px;

  @media (max-width: 700px) {
    padding-top: 28px;
  }
`;

const ProductGridWrapper = styled.div`
  width: 100%;
`;

/* ============================================================
   SKELETON
============================================================ */

const SkeletonGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 30px 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 10px;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  overflow: hidden;
  background: #faf8f5;

  .skeleton-image {
    width: 100%;
    aspect-ratio: 1 / 1;

    background: #ebe7e0;
    border-radius: 0;
  }
`;

const SkeletonInfo = styled.div`
  padding: 12px 4px 0;

  .MuiSkeleton-root {
    background: #e2ded7;
  }
`;

/* ============================================================
   EMPTY STATE
============================================================ */

const EmptyState = styled.div`
  width: 100%;
  min-height: 430px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  background: rgba(250, 248, 245, 0.5);
`;

const EmptyLogo = styled.span`
  margin-bottom: 18px;

  color: #ad8d63;

  font-family: Arial, sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.4em;
`;

const EmptyTitle = styled.p`
  max-width: 420px;
  margin: 0;

  color: #3a3936;

  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.7;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 0 20px;
  }
`;

const EmptyLine = styled.div`
  width: 36px;
  height: 1px;
  margin-top: 24px;

  background: #ad8d63;
`;

/* ============================================================
   PAGINATION
============================================================ */

const PaginationWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 62px;
  padding-top: 30px;

  border-top: 1px solid rgba(22, 21, 19, 0.06);

  direction: ltr;

  .MuiPagination-ul {
    gap: 4px;
  }

  .MuiPaginationItem-root {
    min-width: 32px;
    height: 32px;
    margin: 0;

    border-radius: 2px;

    color: #88837b;

    font-family: Arial, sans-serif;
    font-size: 0.68rem;
    font-weight: 400;

    background: transparent;
    border: none;

    transition:
      background 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: #161513;
      background: rgba(22, 21, 19, 0.045);
    }
  }

  .MuiPaginationItem-root.Mui-selected {
    color: #faf8f5;
    background: #161513;

    &:hover {
      background: #161513;
    }
  }

  .MuiPaginationItem-root.Mui-disabled {
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    margin-top: 42px;
    padding-top: 22px;

    .MuiPaginationItem-root {
      min-width: 29px;
      height: 29px;
      font-size: 0.61rem;
    }
  }
`;
