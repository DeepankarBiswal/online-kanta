import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-[#4ADE80] via-[#22D3EE] to-[#60A5FA] py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <h1 className="text-5xl lg:text-[56px] font-extrabold text-white leading-tight mb-6">
              Turn Your Scrap Into Smart Value
            </h1>
            <p className="text-[22px] text-white/90 mb-8 leading-relaxed">
              Schedule doorstep scrap pickup instantly — transparent rates,
              verified agents, and eco-friendly recycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-pickup">
                <button className="px-10 py-4 bg-white text-[#111827] font-bold rounded-full hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:-translate-y-1">
                  Book Pickup
                </button>
              </Link>
              <button className="px-10 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/50 hover:bg-white/30 transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10">
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608476524605-2ad765c3bd78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB0cnVjayUyMGNpdHl8ZW58MXx8fHwxNzY0NzQ4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Recycling and scrap pickup service"
                className="w-full h-auto"
              />
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#111827]/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
