import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { categoryList } from "../../common/categoryList";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ApiInstance from "../../common/baseUrl";
import Products from "../components/Product/home/Products";
import { toggleCategory, setSort, resetFilters } from "../features/filterSlice";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Grid2 } from "@mui/material";


export default function FilterPageStyled() {
  const [productsList, setProductsList] = useState([]);
  const [count, setCount] = useState(1); // Pagination usually starts at 1
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sort = useSelector(state => state.filter.sort);
  const categories = useSelector(state => state.filter.categories);
  const search = useSelector(state => state.filter.search);

  const dispatch = useDispatch();

  const fetchProducts = () => {
    setIsLoading(true);
    ApiInstance.get("product-search/", {
      params: {
        search: search,
        category: categories,
        sort: sort,
        current_page: count,
        per_page: 12,
      },
    })
      .then((response) => {
        setProductsList(response.data.results || []);
        setTotalPages(response.data.total_pages || 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categories, sort, count]); // Include sort so it triggers fetch

  return (
      <Page>
        <Filters initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div>
            <Title>Category</Title>
            {categoryList.map(cat => (
              <CheckboxRow key={cat.value}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat.value)}
                  onChange={() => dispatch(toggleCategory(cat.value))}
                />
                {cat.label}
              </CheckboxRow>
            ))}
          </div>

          <Button onClick={() => dispatch(resetFilters())}>
            Reset filters
          </Button>
        </Filters>

        
          <SortWrapper>
            <span>Sort by:</span>
            <SortBarContainer>
              <button
                onClick={() => dispatch(setSort("best_match"))}
                className={sort === "best_match" ? "active" : ""}
              >
                Best Match
              </button>
              <button
                onClick={() => dispatch(setSort("orders"))}
                className={sort === "orders" ? "active" : ""}
              >
                Orders
              </button>
              <button
                onClick={() => dispatch(setSort(sort === "price_asc" ? "price_desc" : "price_asc"))}
                className={sort === "price_asc" || sort === "price_desc" ? "active" : ""}
              >
                Price <span>⇅</span>
              </button>
            </SortBarContainer>
          </SortWrapper>

            {isLoading ? (

              <Grid2 container justifyContent="center">
                {Array.from(new Array(8)).map((_, index) => {
                  return(
                  <Box key={index} sx={{ mb: 2, mr: 2 }} width={220}  >

                    <Skeleton variant="rectangular" width={220} height={300} style={{borderRadius: '6px'}} />
                  </Box>
                )})}
              </Grid2>
            ) : productsList.length > 0 ? (
              <Products columsNumber={5} products={productsList} placeItems="center" />
            ) : (
              <div style={{ height: "100vh" }}>{"no result found"}</div>
            )}

          <Stack spacing={2} style={{ margin: "1rem 0", alignItems: 'center' }}>
            {totalPages >= 1 && (
              <Pagination
                count={totalPages}
                page={count}
                color="primary"
                onChange={(e, value) => setCount(value)}
              />
            )}
          </Stack>
      </Page>
  );
}


const Page = styled.div`
  max-width: 2080px;
  margin: 0 auto;
  diplay:flex;

  @media (max-width: 768px) {
 
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #6b7280;
  padding: 1rem 0;
  margin-right: 2rem;
`;

export const SortBarContainer = styled.div`
  display: inline-flex;

  button {
    background: #fff;
    border: 1px solid #e5e7eb;
    padding: 0.45rem 0.9rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: #6b7280;
    line-height: 1;
    white-space: nowrap;
  }

  button:not(:first-child) {
    border-left: none;
  }

  button:first-child {
    border-radius: 4px 0 0 4px;
  }

  button:last-child {
    border-radius: 0 4px 4px 0;
  }

  button:hover {
    color: #111;
  }

  button.active {
    border: 1px solid #111;
    color: #111;
    font-weight: 500;
    z-index: 1;
  }
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const Filters = styled(Card)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background: #f9fafb;
  }
`;

const Flex = styled.div`
  display:flex;
`;
