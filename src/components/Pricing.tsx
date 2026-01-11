import { Check } from "lucide-react";
import {
  Hammer,
  Cpu,
  Recycle,
  Wrench,
  Smartphone,
  Refrigerator,
  Battery,
  Package,
  Wine,
} from "lucide-react";

export function Pricing() {
  const scrapCategories = [
    {
      title: "Metals (Ferrous & Non-Ferrous)",
      icon: <Hammer className="h-10 w-10 text-green-600 mb-4" />,
      description: "Best rates for industrial and household metals.",
      items: [
        {
          name: "Steel / Iron",
          desc: "Bed frames, pipes, fences, tools",
          price: "₹26/kg",
        },
        {
          name: "Aluminum",
          desc: "Cans, foil, window frames",
          price: "₹105/kg",
        },
        {
          name: "Copper",
          desc: "Wires, motors (Very Valuable)",
          price: "₹420/kg",
        },
        {
          name: "Brass",
          desc: "Faucets, locks, instruments",
          price: "₹305/kg",
        },
        { name: "Lead", desc: "Car batteries, roofing", price: "₹85/kg" },
        { name: "Stainless Steel", desc: "Sinks, cookware", price: "₹45/kg" },
      ],
    },
    {
      title: "Electronics & E-Waste",
      icon: <Cpu className="h-10 w-10 text-blue-600 mb-4" />,
      description: "Secure recycling for gadgets and appliances.",
      items: [
        {
          name: "Computers / Laptops",
          desc: "Circuit boards, hard drives",
          price: "₹300/pc",
        },
        {
          name: "Old Phones",
          desc: "Chargers, cables, batteries",
          price: "₹20/pc",
        },
        {
          name: "Large Appliances",
          desc: "Fridges, Washing Machines",
          price: "₹800+/pc",
        },
        { name: "Microwaves", desc: "Motors, copper wiring", price: "₹200/pc" },
        {
          name: "Motors & Fans",
          desc: "Ceiling fans, vacuums",
          price: "₹35/kg",
        },
        {
          name: "AC Units",
          desc: "Window/Split (Copper coil)",
          price: "₹3500/pc",
        },
      ],
    },
    {
      title: "Other Household Items",
      icon: <Recycle className="h-10 w-10 text-amber-600 mb-4" />,
      description: "Everyday recyclables and reusable materials.",
      items: [
        {
          name: "Paper & Cardboard",
          desc: "Newspapers, Amazon boxes",
          price: "₹14/kg",
        },
        {
          name: "Glass Bottles",
          desc: "Beer/Wine bottles (Reuse)",
          price: "₹2/pc",
        },
        {
          name: "Car Batteries",
          desc: "Old inverter/car batteries",
          price: "₹75/kg",
        },
        {
          name: "Plastic Waste",
          desc: "Bottles, containers, chairs",
          price: "₹12/kg",
        },
        { name: "Old Tyres", desc: "Bike/Car tyres", price: "₹5/kg" },
        {
          name: "Books / Magazines",
          desc: "School books, notebooks",
          price: "₹12/kg",
        },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
            Transparent Scrap Rates
          </h2>
          <p className="text-lg text-slate-400">
            We offer the best market prices for your scrap. Prices may vary
            slightly based on daily market fluctuation and condition.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {scrapCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-green-600/50 transition-all duration-300 flex flex-col"
            >
              {/* Card Header */}
              <div className="text-center flex flex-col items-center border-b border-slate-800 pb-6 mb-6">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-sm">{category.description}</p>
              </div>

              {/* List of Items */}
              <div className="space-y-4 flex-1">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start group"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-green-400 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                    <div className="font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded text-sm whitespace-nowrap">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => (window.location.href = "/book-pickup")}
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-green-600 text-slate-200 hover:text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Sell {category.title.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Order Notice */}
        <div className="mt-12 text-center bg-slate-900/50 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-slate-300">
            <span className="text-green-500 font-bold">
              Have Bulk Quantity?
            </span>{" "}
            (More than 100kg)
            <br />
            <span className="text-sm text-slate-400">
              Call us directly for a custom quote and special pickup
              arrangement.
            </span>
          </p>
          <a
            href="tel:+919876543210"
            className="inline-block mt-3 text-white font-bold hover:underline"
          >
            📞 +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}
