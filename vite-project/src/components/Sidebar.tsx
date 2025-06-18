import { useEffect, useState } from "react";

interface Prodcut {
  category: string;
}
interface fetchResponse {
  products: Prodcut[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: fetchResponse = await response.json();
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
    <div className=" w-64 p-5  h-screen">
      <h1>react store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
          />
        </div>
        <div className="category">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="pl-5">
            {categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="mr-2 w-[16px] h-[16px]"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200">
                {keyword}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
            reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
