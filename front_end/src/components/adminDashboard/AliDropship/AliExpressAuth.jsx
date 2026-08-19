import React, { useEffect, useState } from "react";
import ApiInstance from "../../../../common/baseUrl"; // your existing Axios instance
import styled from "styled-components";

const APP_KEY = import.meta.env.VITE_API_ALIEXPRESS_APPKEY;
const REDIRECT_URI = import.meta.env.VITE_ALIEXPRESS_REDERECT_URL;

export default function AliExpressAuth() {
  const [loading, setLoading] = useState(false);
   const [connected, setConnected] = useState(false);
  const [product, setProduct] = useState(null);

  const handleLogin = () => {
    const authUrl = `https://auth.aliexpress.com/oauth/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

   // =========================================================
  // CONNECT WITH ALIEXPRESS
  // =========================================================

  const handleConnect = () => {
    if (!APP_KEY || !REDIRECT_URI) {
      console.error("AliExpress OAuth configuration is missing.");
      return;
    }

    const authUrl =
      `https://auth.aliexpress.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${encodeURIComponent(APP_KEY)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    window.location.assign(authUrl);
  };

  // =========================================================
  // EXCHANGE OAUTH CODE FOR TOKENS
  // =========================================================

  const exchangeCode = async (code) => {
    try {
      setLoading(true);

      const response = await ApiInstance.post(
        "aliexpress/token/",
        { code }
      );

      const { access_token, refresh_token } = response.data;

      if (!access_token) {
        throw new Error("AliExpress did not return an access token.");
      }

      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        access_token
      );

      if (refresh_token) {
        localStorage.setItem(
          REFRESH_TOKEN_KEY,
          refresh_token
        );
      }

      setConnected(true);

      // Remove OAuth code from URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

    } catch (error) {
      console.error(
        "AliExpress OAuth error:",
        error?.response?.data || error
      );

      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIALIZE
  // =========================================================

  useEffect(() => {
    const initialize = async () => {
      const params = new URLSearchParams(
        window.location.search
      );

      const code = params.get("code");

      // -----------------------------------------------
      // Returned from AliExpress OAuth
      // -----------------------------------------------

      if (code) {
        await exchangeCode(code);
        return;
      }

      // -----------------------------------------------
      // Existing connection
      // -----------------------------------------------

      const accessToken = localStorage.getItem(
        ACCESS_TOKEN_KEY
      );

      if (accessToken) {
        setConnected(true);
      }
    };

    initialize();
  }, []);
  
  return (
    <Container>

        <ButtonRow>
          <Button color="#ffffff" onClick={handleLogin} disabled={loading}>
            Connect with AliExpress  {connected ?  "✅": "❌"}
          </Button>
        </ButtonRow>

       

        
    </Container>
  );
}

//
// 🎨 Styled Components
//
const Container = styled.div`
  
`;

const Card = styled.div`
 
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 1.5rem;
`;

const ButtonRow = styled.div`
  
`;

const Button = styled.button`
background-color: #27f2f5da !important;
  color: #fff !important;
  font-weight: 600 !important;
  padding: 10px 24px !important;
  border-radius: 8px !important;
  text-transform: none !important;
  transition: background 0.3s !important;
  margin-bottom: 15px;

  &:hover {
    background-color: #f527278c !important;
  }

  &:disabled {
    background-color: #9ca3af !important;
    color: #f3f4f6 !important;
  }

`;

const Status = styled.p`
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
  }
`;