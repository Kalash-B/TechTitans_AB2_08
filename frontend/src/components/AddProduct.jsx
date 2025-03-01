import { useState, useEffect } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    image: null,
    farmerId: "", // Add farmerId
  });

  // Fetch farmerId from localStorage (assuming it's stored after login)
  useEffect(() => {
    const storedFarmerId = localStorage.getItem("farmerId");
    if (storedFarmerId) {
      setFormData((prev) => ({ ...prev, farmerId: storedFarmerId }));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

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
};

export default AddProduct;
