// src/components/AliExpressProductFetch.jsx
import { useState } from "react";
import axios from "axios";
import ApiInstance from "../../../../common/baseUrl";
import AliExpressAuth from "./AliExpressAuth";
import ProductEditor from "../ProductEditor";

export default function AliExpressProductFetcher() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    // Frontend sends GET request with query param access_token
    ApiInstance.get(
      `http://localhost:8000/api/aliexpress/product/${productId}`,
      {
        params: {
          aliexpress_access_token: localStorage.getItem("aliexpress_access_token")
        }
      }
    )
    .then((res) => {
      console.log("Product data:", res.data.data.result);
      setProduct(res.data.data.result); // Product details returned by Django
    })
    .catch((err) => {
      setError(err.response?.data?.error || err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }    

  return (
    <div>
      <h2>Fetch AliExpress Product</h2>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={fetchProduct} disabled={loading}>
        {loading ? "Loading..." : "Fetch Product"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {product && (
        <ProductEditor product={product} setProduct={setProduct} />
      )}
      <AliExpressAuth/>
    </div>
  );
}
