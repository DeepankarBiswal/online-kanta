import { useState } from "react";
import {
  Newspaper,
  Monitor,
  Wrench,
  Package,
  Battery,
  Fan,
} from "lucide-react"; // Make sure to install lucide-react

// Data Structure (You can move this to Supabase later)
const CATEGORIES = [
  { id: "paper", label: "Paper & Cardboard" },
  { id: "metal", label: "Metals" },
  { id: "large", label: "Large Appliances" },
  { id: "small", label: "Small Appliances" },
];

const RATES_DATA: Record<string, any[]> = {
  paper: [
    {
      name: "Newspaper",
      price: "₹14/kg",
      icon: <Newspaper size={40} className="text-gray-600" />,
    },
    {
      name: "Books",
      price: "₹12/kg",
      icon: <Package size={40} className="text-amber-700" />,
    },
    {
      name: "Carton (Gatta)",
      price: "₹8/kg",
      icon: <Package size={40} className="text-amber-600" />,
    },
    {
      name: "Office Paper",
      price: "₹15/kg",
      icon: <Newspaper size={40} className="text-blue-200" />,
    },
  ],
  metal: [
    {
      name: "Iron",
      price: "₹26/kg",
      icon: <Wrench size={40} className="text-gray-700" />,
    },
    {
      name: "Aluminium",
      price: "₹105/kg",
      icon: <Wrench size={40} className="text-gray-400" />,
    },
    {
      name: "Brass",
      price: "₹305/kg",
      icon: <Wrench size={40} className="text-yellow-600" />,
    },
    {
      name: "Copper",
      price: "₹420/kg",
      icon: <Wrench size={40} className="text-orange-600" />,
    },
  ],
  large: [
    {
      name: "Split AC (1.5 Ton)",
      price: "₹4100/pc",
      icon: <Fan size={40} className="text-blue-500" />,
    },
    {
      name: "Window AC",
      price: "₹3500/pc",
      icon: <Fan size={40} className="text-gray-500" />,
    },
    {
      name: "Fridge (Double)",
      price: "₹1200/pc",
      icon: <Package size={40} className="text-blue-800" />,
    },
    {
      name: "Washing Machine",
      price: "₹800/pc",
      icon: <Package size={40} className="text-gray-600" />,
    },
  ],
  small: [
    {
      name: "E-Waste",
      price: "₹20/kg",
      icon: <Monitor size={40} className="text-green-600" />,
    },
    {
      name: "Battery",
      price: "₹80/kg",
      icon: <Battery size={40} className="text-red-600" />,
    },
    {
      name: "Microwave",
      price: "₹200/pc",
      icon: <Monitor size={40} className="text-gray-800" />,
    },
    {
      name: "Ceiling Fan",
      price: "₹35/kg",
      icon: <Fan size={40} className="text-gray-700" />,
    },
  ],
};

export default function RateChart() {
  const [activeTab, setActiveTab] = useState("paper");

  return (
    <section className="py-16 bg-white" id="rates">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Today's Scrap Rates
          </h2>
          <p className="text-slate-500">
            Best prices guaranteed for your recyclables
          </p>
        </div>

        {/* Categories (Horizontal Scroll on Mobile) */}
        <div className="flex overflow-x-auto gap-4 pb-4 mb-6 justify-start md:justify-center scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                activeTab === cat.id
                  ? "bg-green-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rate Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
          {RATES_DATA[activeTab]?.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-xl hover:border-green-200 transition-all duration-300"
            >
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-lg mb-1">
                {item.name}
              </h3>
              <p className="text-green-600 font-bold text-xl">{item.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xs text-gray-400">
            * Prices may vary based on market fluctuation and condition of
            items.
          </p>
        </div>
      </div>
    </section>
  );
}
