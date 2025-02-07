"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface ProductType {
  _id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  discountPercent: string;
  ratingReviews: string;
}
const fetchProducts = async (category: string): Promise<ProductType[]> => {
  const products = await client.fetch(
    `*[_type=="${category}"]{
      _id,
      name,
      price,
      "imageUrl" : image.asset->url,
      category,
      discountPercent,
      ratingReviews
    }`
  );
  return products;
};
const ProductDashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categories = [
          "casual",
          "women",
          "men",
          "kids",
          "newArrivals",
          "topSelling",
        ];
        const allProducts = await Promise.all(
          categories.map((category) => fetchProducts(category))
        );
        const combinedProducts = allProducts.flat();
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bg-black text-white p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="grid grid-cols-6 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Discount</p>
        <p>Rating</p>
      </div>
      <div className="mt-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center py-4 border-b border-gray-700 text-center"
            >
              <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-white">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-6 items-center py-4 border-b border-gray-700 text-center"
            >
              <Image
                height={64}
                width={64}
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover mx-auto rounded-lg"
              />
              <p className="font-semibold font-satoshi">{product.name}</p>
              <p className="text-gray-400 text-sm font-satoshi">
                {product.category}
              </p>
              <p className="text-white font-bold font-satoshi">
                ${product.price}
              </p>
              {product.discountPercent ? (
                <p className="text-red-500 font-satoshi">
                  {product.discountPercent}% Off
                </p>
              ) : (
                <p className="text-red-500 font-satoshi">-</p>
              )}
              <p className="text-yellow-400 font-satoshi">
                ⭐ {product.ratingReviews}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default ProductDashboard;
