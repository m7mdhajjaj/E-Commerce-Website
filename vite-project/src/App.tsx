import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContext from "./components/MainContect";
import MobileSidebar from "./components/MobileSidebar";
import { FilterProvider } from "./FilterComponent";
import { CartProvider } from "./CartContext";

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <FilterProvider>
      <CartProvider>
        <Router>
          <div className="flex min-h-screen bg-gray-50">
            <aside>
              <Sidebar />
            </aside>

            <MobileSidebar
              isOpen={isMobileSidebarOpen}
              onClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="flex-1 ml-0 md:ml-64 w-full md:w-[calc(100%-16rem)] overflow-auto">
              <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="mr-3 md:hidden"
                      onClick={toggleMobileSidebar}>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </button>
                    <h1 className="text-2xl font-bold">ShopMart</h1>
                  </div>
                  <div className="text-sm">Discover • Shop • Enjoy</div>
                </div>
              </header>
              <main className="container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<MainContext />} />
                </Routes>
              </main>
              <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">ShopMart</h3>
                    <p className="text-sm">
                      Your one-stop shopping destination
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      © 2025 ShopMart. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Router>
      </CartProvider>
    </FilterProvider>
  );
}

export default App;
