import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <>
      {/* Header Section */}
      <header className="bg-lime-300 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center font-[Newsreader]">
          <h1 className="text-2xl font-semibold text-green-800">Farm2Home</h1>
          <nav className="space-x-4">
            <a className="text-gray-700 hover:text-green-800" href="#">Shop</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Product</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Contact Us</a>
            <Link to="/auth">
              <button className="bg-green-800 text-white px-4 py-2 rounded">Sign up</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center h-screen bg-white text-center font-[Newsreader]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Fresh And Organic Products For You
        </h1>
        <p className="text-lg md:text-xl mb-8">
          From Our Farm To Your Home Without Any Intermediaries
        </p>
        <button className="bg-lime-300 text-black px-6 py-3 rounded">Shop Now</button>
      </main>

      {/* How It Works Section */}
      <section className="container mx-auto py-12 font-[Newsreader]">
        <h1 className="text-4xl font-bold text-center mb-12">How it Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Consumers", details: ["Order directly from farmers", "Receive fresh produce", "Rate and review products"] },
            { title: "Local Farmers", details: ["Verify and publish product details", "Handle customer orders", "Ensure timely delivery"] },
            { title: "Farmers", details: ["List your farm products", "Receive direct orders", "Get feedback from customers"] },
          ].map((item, index) => (
            <div key={index} className="bg-lime-100 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <ul className="text-left text-gray-700">
                {item.details.map((detail, i) => (
                  <li key={i} className="mb-2">• {detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </>
  );
};

export default Home;
