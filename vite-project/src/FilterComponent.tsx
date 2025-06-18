import { useState, useContext, createContext } from "react";
import React from "react";
import type { ReactNode } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  selectedCategories: string;
  setSelectedCategories: (categories: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};