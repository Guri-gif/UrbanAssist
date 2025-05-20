import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(  "pk_test_51Q824bP1SQGnHBcZ9hGu4mXg3MStQgOLeuaFPgocF3QdqtHqEXuYAXKVu8h7V7sYY8LlTK7K57wdSe3m8yGAAXvm00zkViOYS0");

const Booking = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    address: "",
    selectedDate: "",
    selectedTime: "",
    selectedService: ""
  });
  const [pageBackground, setPageBackground] = useState("#f4f4f9");
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomBackground = () => {
    const colors = ["#f4f4f9", "#e0f7fa", "#fff3e0", "#fce4ec", "#ffecb3"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    setPageBackground(generateRandomBackground());
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("Please login first!");
      // Redirect to login if needed
    }

    setFormData({
      customerName: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      address: "",
      selectedDate: "",
      selectedTime: "",
      selectedService: ""
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      toast.error("Please select both date and time!");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your address!");
      return false;
    }
    if (!formData.selectedService) {
      toast.error("Please select a service!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      toast.error("Please login first!");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create booking
      const bookingData = {
        serviceId: "67fc8cba88240f3b0067c355", // Should ideally be dynamic
        customerId: userId,
        customerName: formData.customerName,
        serviceName: formData.selectedService,
        date: formData.selectedDate,
        time: formData.selectedTime,
        address: formData.address
      };

      const bookingResponse = await axios.post(
        `http://localhost:5000/api/auth/book`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Booking confirmed! Processing payment...");

      // 2. Create payment session
      const paymentResponse = await axios.post(
        `http://localhost:5000/api/auth/payment`,
        {
          amount: 0.5, // Should be dynamic based on service
          serviceName: formData.selectedService
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 3. Redirect to Stripe
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentResponse.data.sessionId
      });

      if (error) throw error;

    } catch (err) {
      console.error("Booking error:", err);
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      err.message || 
                      "Booking failed";
      toast.error(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  useGSAP(() => {
    gsap.from("#bookingForm", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: pageBackground }}>
      <form
        id="bookingForm"
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 flex flex-col gap-6 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Book Your Service
        </h1>

        <div className="space-y-4">
          {/* Customer Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent h-24"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="selectedTime"
                value={formData.selectedTime}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Service</label>
            <select
              name="selectedService"
              value={formData.selectedService}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Select a Service</option>
              <option value="Women Makeup">Women Makeup</option>
              <option value="Mens Grooming">Mens Grooming</option>
              <option value="Appliance Repair">Appliance Repair</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Handymen">Handymen</option>
              <option value="Painter">Painter</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default Booking;