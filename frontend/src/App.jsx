import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GoogleMapComponent from "./components/GoogleMapComponent";
import AuthForm from "./components/AuthForm";
import Product from "./components/Products";
import AddProduct from "./components/AddProduct";
<<<<<<< HEAD
import Footer from "./components/Footer";
=======

import "./index.css";

>>>>>>> dc82869 (Sordt by category, database integration)
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route
              path="/dashboard"
              element={
                <div className="flex justify-center items-center h-screen bg-gray-100">
                  <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">Nearby Farmers (20km)</h1>
                    <GoogleMapComponent />
                  </div>
                </div>
              }
            />
            <Route path="/products" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
<<<<<<< HEAD
    </div>
    <AuthForm />
    <Home />
    <Product />
    <ProductList />
    <AddProduct />
    <Footer />
    </div>
=======
    </Router>
>>>>>>> dc82869 (Sordt by category, database integration)
  );
}

export default App;
