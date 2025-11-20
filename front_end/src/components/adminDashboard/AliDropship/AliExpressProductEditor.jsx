import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AliExpressProductEditor({ product }) {
  const [formData, setFormData] = useState({
    title: product.product_title,
    price: product.product_price?.amount,
    currency: product.product_price?.currency_code,
    image: product.product_images?.[0] || "",
    store_id: product.store_info?.store_id || "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const publishToStore = () => {
    setSaving(true);
    setMessage("");

    fetch("/api/store/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setMessage(data.error);
        else setMessage("✅ Product published successfully!");
      })
      .catch(() => setMessage("❌ Failed to publish"))
      .finally(() => setSaving(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-gray-50 rounded-xl shadow-inner"
    >
      <h2 className="font-semibold mb-4 text-lg text-center">
        Edit & Publish Product
      </h2>

      <div className="grid gap-3">
        <label className="text-sm font-medium">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <label className="text-sm font-medium">Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <label className="text-sm font-medium">Currency</label>
        <input
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <label className="text-sm font-medium">Image URL</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt={formData.title}
            className="mt-3 rounded-xl max-h-48 object-cover"
          />
        )}

        <button
          onClick={publishToStore}
          disabled={saving}
          className="mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {saving ? "Publishing..." : "Publish to Store"}
        </button>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </motion.div>
  );
}
