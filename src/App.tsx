import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
// import { BookPickup }  from "./components/BookPickup";
import BookPickupPage from "./pages/BookPickupPage";
import PickupSuccessPage from "./pages/PickupSuccessPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";



function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main>
        <Hero />
        {/* <BookPickup /> */}
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-pickup" element={<BookPickupPage />} />
      <Route path="/pickup-success" element={<PickupSuccessPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
