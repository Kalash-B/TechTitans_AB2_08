import { useState, useRef } from "react";
import placeholderImage from "../assets/PlaceHolder.jpg";

const AddProduct = () => {
    // State variables
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    // Reference to file input
    const fileInputRef = useRef(null);

    // Category options
    const categories = ["Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Other"];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    // Open file input when clicking on image preview
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Get farmerId from localStorage
        const farmerId = localStorage.getItem("farmerId");
        if (!farmerId) {
            setError("Farmer ID is missing. Please log in again.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("category", category);
        formData.append("farmerId", farmerId);
        formData.append("image", imageFile);

        try {
            const response = await fetch("http://localhost:5000/api/products/add", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to add product");
            }

            alert("Product added successfully");

            // Reset form fields
            setProductName("");
            setDescription("");
            setPrice("");
            setDiscount("");
            setCategory("");
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-green-50">
            <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                {/* Image Preview Box */}
                <div className="flex justify-center mb-4">
                    <img
                        src={imagePreview || placeholderImage}
                        alt="Product Preview"
                        onClick={handleImageClick}
                        className="w-32 h-32 object-cover border border-gray-300 rounded-lg cursor-pointer"
                    />
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                />

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
                        placeholder="Discount (%)"
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
                    <button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
