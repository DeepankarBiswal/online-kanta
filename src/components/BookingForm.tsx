import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  FileText,
  Newspaper,
  Zap,
  Package,
  Droplet,
  Wrench,
  CheckCircle2,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/online-kanta-logo.png";
import { useAuth } from "../hooks/useAuth";

const scrapTypes = [
  { value: "paper", label: "Paper & Cardboard", icon: Newspaper },
  { value: "plastic", label: "Plastic", icon: Droplet },
  { value: "metal", label: "Metal", icon: Wrench },
  { value: "electronics", label: "Electronics", icon: Zap },
  { value: "mixed", label: "Mixed Scrap", icon: Package },
];

const timeSlots = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
  "5:00 PM - 7:00 PM",
];

interface FormData {
  email: string;
  fullName: string;
  phone: string;
  area: string;
  address: string;
  date: string;
  timeSlot: string;
  scrapType: string;
  notes: string;
}

interface FormErrors {
  email?: string;
  fullName?: string;
  phone?: string;
  area?: string;
  address?: string;
  date?: string;
  timeSlot?: string;
  scrapType?: string;
}

export function BookingForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    phone: "",
    area: "",
    address: "",
    date: "",
    timeSlot: "",
    scrapType: "",
    notes: "",
  });

  // Pre-fill email from authenticated user
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "email": {
        if (!value.includes("@")) return "Please enter a valid email";
        break;
      }
      case "fullName": {
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        break;
      }
      case "phone": {
        if (!value.trim()) return "Phone number is required";
        if (!/^\+?[\d\s-]{10,}$/.test(value))
          return "Enter a valid phone number";
        break;
      }
      case "area": {
        if (!value.trim()) return "Area/locality is required";
        break;
      }
      case "address": {
        if (!value.trim()) return "Full address is required";
        if (value.trim().length < 10) return "Please enter a complete address";
        break;
      }
      case "date": {
        if (!value) return "Pickup date is required";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Date cannot be in the past";
        break;
      }
      case "timeSlot": {
        if (!value) return "Please select a time slot";
        break;
      }
      case "scrapType": {
        if (!value) return "Please select scrap type";
        break;
      }
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields (KEEPING your validation logic)
    const newErrors: FormErrors = {};
    const requiredFields = [
      "email",
      "fullName",
      "phone",
      "area",
      "address",
      "date",
      "timeSlot",
      "scrapType",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    setTouched(
      requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    );

    // If NO errors, send to Supabase
    if (Object.keys(newErrors).length === 0) {
      try {
        const bookingData = {
          customer_name: formData.fullName,
          phone_number: formData.phone,
          area: formData.area,
          address: formData.address,
          pickup_date: formData.date,
          time_slot: formData.timeSlot,
          scrap_type: formData.scrapType,
          notes: formData.notes,
          status: "pending",
        };

        console.log("Attempting to insert booking data:", bookingData);

        const { error } = await supabase
          .from("bookings_v2")
          .insert([bookingData]);

        if (error) throw error;

        // Success!
        console.log("Form submitted to Supabase:", formData);
        setIsSubmitted(true);
      } catch (error: unknown) {
        console.error("Error submitting form - Full error:", error);
        let errorMessage = "Unknown error";

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          errorMessage = (error as { message: string }).message;
        }

        console.error("Final error message:", errorMessage);
        alert("Error booking pickup: " + errorMessage);
      }
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-teal-400 to-emerald-400 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-3">Pickup Request Confirmed!</h2>
            <p className="text-white/80 mb-6">
              We've received your scrap pickup request for {formData.date}{" "}
              during {formData.timeSlot}.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <p className="text-white/90 mb-2">
                <strong>Confirmation Details:</strong>
              </p>
              <p className="text-white/70 text-sm">
                A confirmation message will be sent to your WhatsApp number (
                {formData.phone}) and email ({formData.email}) within 10
                minutes.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  email: user?.email || "",
                  fullName: "",
                  phone: "",
                  area: "",
                  address: "",
                  date: "",
                  timeSlot: "",
                  scrapType: "",
                  notes: "",
                });
                setTouched({});
              }}
              className="px-8 py-3 bg-white text-teal-600 rounded-full hover:bg-white/90 transition-all shadow-lg"
            >
              Book Another Pickup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 px-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-4">
          <img
            src={logo}
            alt="Online Kanta"
            className="h-10 w-auto object-contain"
          />
        </div>
        <h2 className="text-white mb-3">Book your scrap pickup</h2>
        <p className="text-white/80 max-w-lg mx-auto">
          Experience transparent rates and doorstep weighing. We ensure fair
          pricing and hassle-free collection.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white/90 mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!!user}
                className={`w-full bg-white/5 border ${
                  touched.email && errors.email
                    ? "border-red-400/50 focus:border-red-400"
                    : "border-white/10 focus:border-white/30"
                } rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder="your@email.com"
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-300">{errors.email}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-white/90 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.fullName && errors.fullName
                    ? "border-red-400/50 focus:border-red-400"
                    : "border-white/10 focus:border-white/30"
                } rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all`}
                placeholder="Enter your full name"
              />
            </div>
            {touched.fullName && errors.fullName && (
              <p className="mt-2 text-sm text-red-300">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-white/90 mb-2">
              Phone / WhatsApp Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.phone && errors.phone
                    ? "border-red-400/50 focus:border-red-400"
                    : "border-white/10 focus:border-white/30"
                } rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all`}
                placeholder="+91 98765 43210"
              />
            </div>
            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-300">{errors.phone}</p>
            )}
            <p className="mt-2 text-sm text-white/50">
              We'll send pickup confirmation via WhatsApp
            </p>
          </div>

          {/* Area/Locality */}
          <div>
            <label htmlFor="area" className="block text-white/90 mb-2">
              Area / Locality <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.area && errors.area
                    ? "border-red-400/50 focus:border-red-400"
                    : "border-white/10 focus:border-white/30"
                } rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all`}
                placeholder="e.g., Koramangala, Sector 5"
              />
            </div>
            {touched.area && errors.area && (
              <p className="mt-2 text-sm text-red-300">{errors.area}</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label htmlFor="address" className="block text-white/90 mb-2">
              Full Address <span className="text-red-400">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={`w-full bg-white/5 border ${
                touched.address && errors.address
                  ? "border-red-400/50 focus:border-red-400"
                  : "border-white/10 focus:border-white/30"
              } rounded-2xl px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none`}
              placeholder="House/Flat No., Building Name, Street, Landmark"
            />
            {touched.address && errors.address && (
              <p className="mt-2 text-sm text-red-300">{errors.address}</p>
            )}
          </div>

          {/* Date and Time Slot - Grid on larger screens */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div>
              <label htmlFor="date" className="block text-white/90 mb-2">
                Pickup Date <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={getTodayDate()}
                  className={`w-full bg-white/5 border ${
                    touched.date && errors.date
                      ? "border-red-400/50 focus:border-red-400"
                      : "border-white/10 focus:border-white/30"
                  } rounded-2xl px-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all [scheme:dark]`}
                />
              </div>
              {touched.date && errors.date && (
                <p className="mt-2 text-sm text-red-300">{errors.date}</p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label htmlFor="timeSlot" className="block text-white/90 mb-2">
                Preferred Time <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10">
                  <Clock className="w-5 h-5" />
                </div>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border ${
                    touched.timeSlot && errors.timeSlot
                      ? "border-red-400/50 focus:border-red-400"
                      : "border-white/10 focus:border-white/30"
                  } rounded-2xl px-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-slate-800">
                    Select time slot
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-slate-800">
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {touched.timeSlot && errors.timeSlot && (
                <p className="mt-2 text-sm text-red-300">{errors.timeSlot}</p>
              )}
            </div>
          </div>

          {/* Scrap Type */}
          <div>
            <label htmlFor="scrapType" className="block text-white/90 mb-2">
              Type of Scrap <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {scrapTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.scrapType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        scrapType: type.value,
                      }));
                      setTouched((prev) => ({ ...prev, scrapType: true }));
                      setErrors((prev) => ({ ...prev, scrapType: undefined }));
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "bg-white/20 border-white/50 shadow-lg"
                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mb-2 ${
                        isSelected ? "text-white" : "text-white/60"
                      }`}
                    />
                    <span
                      className={`text-sm text-center ${
                        isSelected ? "text-white" : "text-white/70"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {touched.scrapType && errors.scrapType && (
              <p className="mt-2 text-sm text-red-300">{errors.scrapType}</p>
            )}
          </div>

          {/* Notes (Optional) */}
          <div>
            <label htmlFor="notes" className="block text-white/90 mb-2">
              Additional Notes / Remarks{" "}
              <span className="text-white/50">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-white/40">
                <FileText className="w-5 h-5" />
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                placeholder="Any special instructions or details about your scrap..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-linear-to-r from-teal-400 to-cyan-400 text-slate-900 py-4 rounded-2xl hover:from-teal-300 hover:to-cyan-300 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Confirm Pickup Request
            </button>
            <p className="text-center text-white/60 text-sm mt-4">
              We'll confirm on WhatsApp within 10 minutes
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
