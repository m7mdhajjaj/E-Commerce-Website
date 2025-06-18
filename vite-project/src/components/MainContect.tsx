import React from "react";
import { useFilterContext } from "../FilterComponent";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext";
const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-bl-lg font-medium">
          {product.discountPercentage}% OFF
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`absolute bottom-4 left-0 right-0 mx-auto w-4/5 py-2 rounded-full font-medium transition-all transform ${
            isAdding
              ? "bg-green-600 text-white translate-y-0 opacity-100"
              : "bg-white/90 text-gray-900 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}>
          {isAdding ? "Added to Cart ✓" : "Quick Add to Cart"}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm h-12 overflow-hidden mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center border-t pt-3">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              {product.brand} · {product.category}
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAdding
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleAddToCart}
            disabled={isAdding}>
            {isAdding ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const CartSidebar = ({ onClose }: { onClose: () => void }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col overflow-hidden animate-slide-in-right">
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Your Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/20 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-gray-400 mt-2">
                Looks like you haven't added any items yet
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-gray-100">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.price} each
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                          onClick={() => decreaseQuantity(item.id)}>
                          −
                        </button>
                        <span className="px-3 py-1 bg-white text-center w-10">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                          onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                        onClick={() => removeFromCart(item.id)}>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mb-2"
              onClick={() => alert("Checkout functionality would go here!")}>
              Proceed to Checkout
            </button>

            <button
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
              onClick={clearCart}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear Cart{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MainContext = () => {
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategories,
    setSelectedCategories,
    keywords,
    setKeywords,
  } = useFilterContext();
  const { totalItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keywordsList] = useState<string[]>([
    "smartphone",
    "laptop",
    "fragrance",
    "skincare",
    "groceries",
    "furniture",
  ]);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (minPrice !== undefined && minPrice > 0) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }
    if (selectedCategories) {
      filtered = filtered.filter((product) =>
        product.category.includes(selectedCategories)
      );
    }
    if (keywords) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(keywords.toLowerCase()) ||
          product.description.toLowerCase().includes(keywords.toLowerCase()) ||
          product.category.toLowerCase().includes(keywords.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, minPrice, maxPrice, selectedCategories, keywords]);

  const handlePriceRangeSelect = (range: string) => {
    switch (range) {
      case "cheap":
        setMinPrice(0);
        setMaxPrice(50);
        break;
      case "medium":
        setMinPrice(50);
        setMaxPrice(100);
        break;
      case "expensive":
        setMinPrice(100);
        setMaxPrice(1000);
        break;
      default:
        setMinPrice(0);
        setMaxPrice(0);
    }
    setDropdownOpen(false);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Discover Products
        </h1>
        <p className="text-gray-600">
          Browse our collection of quality products
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <button
              className="bg-white border border-gray-300 hover:border-blue-400 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-between min-w-48 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6h18M3 12h18M3 18h18"
                  />
                </svg>
                Price Range
              </span>
              <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-xl w-48 z-10 overflow-hidden">
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100"
                  onClick={() => handlePriceRangeSelect("cheap")}>
                  <span className="font-medium">Budget</span>
                  <div className="text-sm text-gray-500">$0-$50</div>
                </button>
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100"
                  onClick={() => handlePriceRangeSelect("medium")}>
                  <span className="font-medium">Standard</span>
                  <div className="text-sm text-gray-500">$50-$100</div>
                </button>
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => handlePriceRangeSelect("expensive")}>
                  <span className="font-medium">Premium</span>
                  <div className="text-sm text-gray-500">$100+</div>
                </button>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          onClick={() => setIsCartOpen(!isCartOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Cart ({totalItems})</span>
        </button>
      </div>{" "}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Popular Keywords
          </h2>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            onClick={() => setKeywords("")}>
            Clear All
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywordsList.map((keyword, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full border transition-all ${
                keywords === keyword
                  ? "bg-blue-100 border-blue-500 text-blue-700 font-medium shadow-sm"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
              onClick={() =>
                keywords === keyword ? setKeywords("") : setKeywords(keyword)
              }>
              {keyword}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="font-medium text-gray-700">
          {filteredProducts.length} Products Found
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
      {isCartOpen && <CartSidebar onClose={() => setIsCartOpen(false)} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
            <svg
              className="w-20 h-20 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-xl font-medium text-gray-600 mb-2">
              No products found
            </p>
            <p className="text-gray-500 mb-6 max-w-md text-center">
              We couldn't find any products matching your criteria. Try changing
              your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setMinPrice(undefined);
                setMaxPrice(undefined);
                setSelectedCategories("");
                setKeywords("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 mb-6">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium rounded-l-md bg-white border border-gray-300 text-gray-700 
                hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300
                  ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-r-md bg-white border border-gray-300 text-gray-700 
                hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainContext;
