import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#4ADE80] to-[#22D3EE] flex items-center justify-center">
                <span className="text-white font-extrabold text-xl">S</span>
              </div>
              <span className="text-2xl font-extrabold text-[#111827]">ScrapFlow</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
              About
            </a>
            <a href="#pricing" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-8 py-3 bg-linear-to-r from-[#4ADE80] to-[#10B981] text-[#111827] font-bold rounded-full hover:shadow-lg hover:shadow-[#4ADE80]/50 transition-all duration-300 transform hover:-translate-y-0.5">
              Request Pickup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
                About
              </a>
              <a href="#pricing" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
                Pricing
              </a>
              <a href="#contact" className="text-[#111827] hover:text-[#10B981] transition-colors font-medium">
                Contact
              </a>
              <button className="px-8 py-3 bg-linear-to-r from-[#4ADE80] to-[#10B981] text-[#111827] font-bold rounded-full">
                Request Pickup
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
