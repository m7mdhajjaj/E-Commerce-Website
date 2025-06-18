import { useEffect, useState } from "react";
import { useFilterContext } from "../FilterComponent";
import { useCart } from "../CartContext";

interface Product {
  category: string;
}
interface FetchResponse {
  products: Product[];
}

const MobileSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategories,
    setSelectedCategories,
    setKeywords,
  } = useFilterContext();

  const { totalItems } = useCart();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({
    search: true,
    categories: true,
    price: true,
    keywords: true,
  });

  const toggleSection = (section: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: FetchResponse = await response.json();
        const uniqueCategories = new Set(
          data.products.map((product) => product.category)
        );
        setCategories(Array.from(uniqueCategories));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      id="mobile-sidebar"
      className={`fixed inset-0 z-50 md:hidden ${isOpen ? "" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}></div>

      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg animate-slide-in overflow-y-auto">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            ShopMart
          </h1>
          <button className="text-white" onClick={onClose}>
            <svg
              className="w-6 h-6"
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
        <p className="text-sm px-6 pt-1 pb-4 text-blue-100 bg-gradient-to-r from-blue-600 to-indigo-700">
          Find your perfect products
        </p>

        <div className="p-5 space-y-6">
          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("search")}>
              <h2 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isExpanded.search ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              className={`transition-all duration-300 ${
                isExpanded.search ? "max-h-80" : "max-h-0 overflow-hidden"
              }`}>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("price")}>
              <h2 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Price Range
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isExpanded.price ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              className={`transition-all duration-300 ${
                isExpanded.price ? "max-h-80" : "max-h-0 overflow-hidden"
              }`}>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Min"
                  value={minPrice ?? ""}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
                <span className="text-gray-400">-</span>
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Max"
                  value={maxPrice ?? ""}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-200"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(50);
                  }}>
                  Under $50
                </button>
                <button
                  className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-200"
                  onClick={() => {
                    setMinPrice(50);
                    setMaxPrice(100);
                  }}>
                  $50 - $100
                </button>
                <button
                  className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-200"
                  onClick={() => {
                    setMinPrice(100);
                    setMaxPrice(undefined);
                  }}>
                  $100+
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("categories")}>
              <h2 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Categories
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isExpanded.categories ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              className={`transition-all duration-300 ${
                isExpanded.categories
                  ? "max-h-96 overflow-y-auto"
                  : "max-h-0 overflow-hidden"
              }`}>
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center py-2 px-1 cursor-pointer hover:bg-gray-50 rounded-md group">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    checked={selectedCategories === category}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-blue-600 capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("keywords")}>
              <h2 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                Keywords
              </h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isExpanded.keywords ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              className={`transition-all duration-300 ${
                isExpanded.keywords ? "max-h-80" : "max-h-0 overflow-hidden"
              }`}>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <button
                    onClick={() => setKeywords(keyword)}
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
                    # {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">Cart Items:</span>
            <span className="font-medium bg-gray-100 px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setMinPrice(undefined);
              setMaxPrice(undefined);
              setSelectedCategories("");
              setKeywords("");
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
