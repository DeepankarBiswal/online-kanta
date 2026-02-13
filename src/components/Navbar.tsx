import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "../assets/online-kanta-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Online Kanta"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="text-2xl font-semibold text-[#305a50]">
                Online Kanta
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#pricing"
              className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA / Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-[#111827] font-medium text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-[#111827] hover:text-[#10B981] transition-colors font-medium flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/customer/login">
                  <button className="px-6 py-2 text-[#111827] hover:text-[#10B981] transition-colors font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/book-pickup">
                  <button className="px-8 py-3 bg-linear-to-r from-[#4ADE80] to-[#10B981] text-[#111827] font-bold rounded-full hover:shadow-lg hover:shadow-[#4ADE80]/50 transition-all duration-300 transform hover:-translate-y-0.5">
                    Request Pickup
                  </button>
                </Link>
              </>
            )}
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
              <a
                href="#home"
                className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#pricing"
                className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-[#111827] hover:text-[#10B981] transition-colors font-medium"
              >
                Contact
              </a>
              {user ? (
                <>
                  <div className="text-[#111827] text-sm py-2 border-t border-gray-200/50 mt-2">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-[#111827] hover:text-[#10B981] transition-colors font-medium flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/customer/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-6 py-2 text-[#111827] hover:text-[#10B981] transition-colors font-medium text-left">
                      Login
                    </button>
                  </Link>
                  <Link
                    to="/book-pickup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-8 py-3 bg-linear-to-r from-[#4ADE80] to-[#10B981] text-[#111827] font-bold rounded-full">
                      Request Pickup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
