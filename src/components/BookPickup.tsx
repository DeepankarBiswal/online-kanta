import React, { useState } from "react";
import { supabase } from "../supabaseClient"; 
// import { Loader2 } from "lucide-react"; // Optional: for a nice loading spinner

export function BookPickup() {
  // 1. State for form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    scrapType: "Mix", // Default value
    date: "",
  });

  const [loading, setLoading] = useState(false);

  // 2. Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // SEND DATA TO SUPABASE
      const { error } = await supabase
        .from("bookings") // Ensure your table name is 'bookings'
        .insert([
          {
            customer_name: formData.name,
            phone_number: formData.phone,
            address: formData.address,
            scrap_type: formData.scrapType,
            pickup_date: formData.date,
            status: "pending",
          },
        ]);

      if (error) throw error;

      // Success!
      alert("Pickup Scheduled Successfully! We will contact you shortly.");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        scrapType: "Mix",
        date: "",
      });
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error booking pickup: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Schedule a Pickup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            pattern="[0-9]{10}"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Scrap Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scrap Type
          </label>
          <select
            name="scrapType"
            value={formData.scrapType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="Mix">Mix / General Scrap</option>
            <option value="Paper">Newspaper / Books</option>
            <option value="Metal">Iron / Metal</option>
            <option value="E-Waste">Electronics / E-Waste</option>
            <option value="Plastic">Plastic</option>
          </select>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Address
          </label>
          <textarea
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No, Street, Landmark..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date
          </label>
          <input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              {/* Simple spinner SVG */}
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Booking...
            </>
          ) : (
            "Confirm Pickup"
          )}
        </button>
      </form>
    </div>
  );
}
