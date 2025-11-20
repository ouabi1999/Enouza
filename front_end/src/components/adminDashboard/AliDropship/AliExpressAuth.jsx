import React, { useEffect, useState } from "react";
import ApiInstance from "../../../../common/baseUrl";
import styled from "styled-components";



const APP_KEY = import.meta.env.VITE_API_ALIEXPRESS_APPKEY; // <-- replace with real key
const REDIRECT_URI = "https://enouza.com/admin-dashboard/aliexpress-product-fetcher";

export default function AliExpressAuth() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState(null);
  const [product, setProduct] = useState(null);

  // Step 1️⃣: Redirect user to AliExpress OAuth
  const handleLogin = () => {
    const authUrl = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;
    window.location.href = authUrl;
  };

  // Step 2️⃣: On redirect, exchange code for token
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const exchangeToken = async () => {
      setLoading(true);
      setStatus("🔄 Exchanging code for access token...");

      try {
        const res = await ApiInstance.post(`aliexpress/token/${code}/`);
        const data = res.data;
        console.log("🎟️ Token exchange result:", data);

        if (data.access_token) {
          setToken(data.access_token);
          setStatus("✅ Access token received!");
          localStorage.setItem("aliexpress_access_token", data.access_token);
        } else {
          setStatus("⚠️ Token exchange failed. Check console.");
        }
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to contact backend.");
      } finally {
        setLoading(false);
      }
    };

    exchangeToken();
  }, []);

  // Step 3️⃣: Fetch product info using access token
  const fetchProduct = async () => {
    const accessToken = token || localStorage.getItem("aliexpress_access_token");
    if (!accessToken) {
      setStatus("⚠️ Please authenticate first.");
      return;
    }

    setLoading(true);
    setStatus("🔄 Fetching product...");

    try {
      const res = await ApiInstance.get(`aliexpress/product/1005006967486319/`, {
        params: { aliexpress_access_token: accessToken },
      });
      console.log("📦 Product data:", res.data);

      if (res.data.status === "success") {
        setProduct(res.data.data);
        setStatus("✅ Product fetched successfully!");
      } else {
        setStatus("❌ " + (res.data.error || "API error"));
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>AliExpress Integration Demo</Title>

        <ButtonRow>
          <Button color="#ff4747" onClick={handleLogin} disabled={loading}>
            Connect with AliExpress
          </Button>
          <Button color="#007bff" onClick={fetchProduct} disabled={loading}>
            Fetch Product
          </Button>
        </ButtonRow>

        {status && <Status>{status}</Status>}

        {product && (
          <ProductBox>
            <h3>Product Data</h3>
            <pre>{JSON.stringify(product, null, 2)}</pre>
          </ProductBox>
        )}
      </Card>
    </Container>
  );
}

//
// 🎨 Styled Components
//

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: #f6f7fb;
  padding: 3rem 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 1.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: ${(props) => props.color || "#007bff"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s ease;
  min-width: 180px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Status = styled.p`
  margin-top: 1rem;
  color: #444;
  font-size: 0.95rem;
`;

const ProductBox = styled.div`
  margin-top: 2rem;
  background: #f9fafb;
  border: 1px solid #e4e6ea;
  border-radius: 10px;
  text-align: left;
  padding: 1rem;

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  pre {
    font-size: 0.85rem;
    background: #fff;
    padding: 0.75rem;
    border-radius: 8px;
    overflow-x: auto;
  }`