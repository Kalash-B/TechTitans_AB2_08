import { useState } from "react";

const AddProduct = () => {
    // State variables
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");

    // Category options
    const categories = ["Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Other"];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      const farmerId = localStorage.getItem("farmerId");
      if (!farmerId) {
          setError("Farmer ID is missing. Please log in again.");
          return;
      }
  
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("farmerId", farmerId);
      formData.append("image", imageFile);
  
      // Debugging: Log formData
      for (let [key, value] of formData.entries()) {
          console.log(key, value);
      }
  
      try {
          const response = await fetch("http://localhost:5000/api/products/add", {
              method: "POST",
              body: formData,
          });
  
          const result = await response.json();  // Get detailed error message
          if (!response.ok) {
              throw new Error(result.message || "Failed to add product");
          }
  
          console.log("Product Added:", result);
          alert("Product added successfully");
  
          // Reset form
          setProductName("");
          setDescription("");
          setPrice("");
          setDiscount("");
          setCategory("");
          setImageFile(null);
  
      } catch (error) {
          console.error("Error:", error.message);
          setError(error.message);
      }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Retrieve farmerId (Assuming it's stored in localStorage after login)
    const farmerId = localStorage.getItem("farmerId");
  
    if (!farmerId) {
      alert("Farmer ID is missing. Please log in again.");
      return;
    }
  
    const form = new FormData();
    form.append("farmerId", farmerId);  // ✅ Ensure `farmerId` is included
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    // ✅ Debug: Log FormData before sending
    console.log("Submitting Form Data:");
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: form,
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
      alert(data.message);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <input type="number" name="discount" placeholder="Discount (%)" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <select name="category" onChange={handleChange} className="w-full border p-2 rounded-lg" required>
          <option value="">Select Category</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <button type="submit" className="w-full bg-green-900 text-white py-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
=======
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
>>>>>>> dc82869 (Sordt by category, database integration)
};

export default AddProduct;
