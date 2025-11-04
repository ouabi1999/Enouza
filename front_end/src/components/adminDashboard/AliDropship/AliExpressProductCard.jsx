

  import React, { useEffect, useState } from "react";
  import { ShoppingCart, Upload } from "lucide-react";
  import { motion } from "framer-motion";
  
  export default function AliExpressProductCard({ productId }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      if (!productId) return;
  
      setLoading(true);
      setError("");
  
      fetch(`/api/aliexpress/product/${productId}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setProduct(data);
        })
        .catch(() => setError("Failed to fetch product"))
        .finally(() => setLoading(false));
    }, [productId]);
  
    if (loading)
      return (
        <div className="p-4 w-64 h-80 bg-gray-100 animate-pulse rounded-2xl" />
      );
    if (error)
      return (
        <div className="p-4 w-64 bg-red-100 text-red-600 rounded-2xl text-center">
          {error}
        </div>
      );
  
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="w-64 bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <img
          src={product.product_images?.[0]}
          alt={product.product_title}
          className="h-48 w-full object-cover"
        />
        <div className="p-3">
          <h2 className="text-sm font-semibold line-clamp-2 mb-1">
            {product.product_title}
          </h2>
          <p className="text-gray-600 mb-2">
            {product.product_price?.amount}{" "}
            {product.product_price?.currency_code}
          </p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
              <ShoppingCart size={14} /> Add to Cart
            </button>
            <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
              <Upload size={14} /> Import
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
  

