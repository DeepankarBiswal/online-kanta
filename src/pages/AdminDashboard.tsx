import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Phone, Calendar, Clock, MapPin } from "lucide-react"; // ✅ ADDED Clock, MapPin

// ✅ CHANGE 1: Update Interface to match bookings_v2
interface Booking {
  id: string;
  customer_name: string;
  phone_number: string;
  address: string;
  scrap_type: string;
  pickup_date: string;
  status: "pending" | "completed" | "cancelled";
  // New fields
  area: string; // ✅ Added
  time_slot: string; // ✅ Added
  notes?: string; // ✅ Added
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // ✅ CHANGE 2: Fetch from 'bookings_v2'
    const { data, error } = await supabase
      .from("bookings_v2")
      .select("*")
      .order("pickup_date", { ascending: true }); // Ordered by pickup date, logically better for admin

    if (error) console.error("Error fetching bookings:", error);
    else setBookings(data || []);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // ✅ CHANGE 3: Update 'bookings_v2'
    const { error } = await supabase
      .from("bookings_v2")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) console.error("Error updating status:", error);
    else fetchBookings();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Pickup Requests</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 p-6 transition-all hover:shadow-md ${
              booking.status === "completed"
                ? "border-green-500 opacity-75"
                : "border-indigo-500"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2 w-full">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {booking.customer_name}
                    </h3>

                    {/* ✅ CHANGE 4: Display Area & Address */}
                    <div className="flex items-center text-slate-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {booking.area ? `${booking.area}, ` : ""}
                        {booking.address}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                    {booking.phone_number}
                  </div>

                  {/* ✅ CHANGE 5: Display Date & Time Slot */}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {booking.pickup_date}
                  </div>
                  {booking.time_slot && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {booking.time_slot}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <span className="font-semibold text-slate-700">Scrap: </span>
                  <span className="text-indigo-600 font-medium">
                    {booking.scrap_type}
                  </span>
                </div>

                {/* ✅ CHANGE 6: Display Notes if available */}
                {booking.notes && (
                  <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 italic mt-2 border border-slate-100">
                    "{booking.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              {booking.status !== "completed" && (
                <button
                  onClick={() => updateStatus(booking.id, "completed")}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No pickup requests found.
          </div>
        )}
      </div>
    </div>
  );
}
