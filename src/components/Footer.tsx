import { Facebook, Instagram, Linkedin,  } from "lucide-react";
import logo from "../assets/online-kanta-logo.png";


export function Footer() {
  return (
    <footer className="w-full bg-[#111827] text-white py-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Online Kanta"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-extrabold text-white">
                Online Kanta
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Transforming waste into value with transparent, eco-friendly scrap
              recycling solutions for homes and businesses.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-linear-to-br hover:from-[#4ADE80] hover:to-[#10B981] flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-linear-to-br hover:from-[#4ADE80] hover:to-[#10B981] flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-linear-to-br hover:from-[#4ADE80] hover:to-[#10B981] flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-[#4ADE80] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-[#4ADE80] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-[#4ADE80] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-[#4ADE80] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li>support@scrapflow.com</li>
              <li>+91 1800-SCRAP-NOW</li>
              <li>Mon - Sat: 8 AM - 8 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 ScrapFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#4ADE80] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#4ADE80] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#4ADE80] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
