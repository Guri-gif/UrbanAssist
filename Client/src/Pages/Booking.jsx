import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q824bP1SQGnHBcZ9hGu4mXg3MStQgOLeuaFPgocF3QdqtHqEXuYAXKVu8h7V7sYY8LlTK7K57wdSe3m8yGAAXvm00zkViOYS0"
);

const Booking = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [pageBackground, setPageBackground] = useState("#f4f4f9");

  const generateRandomBackground = () => {
    const colors = ["#f4f4f9", "#e0f7fa", "#fff3e0", "#fce4ec", "#ffecb3"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    setPageBackground(generateRandomBackground());

    const storedCustomerName = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("email") || "";

    setCustomerName(storedCustomerName);
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime)
      return toast.error("Please select both date and time!");
    if (!address.trim()) return toast.error("Please enter your address!");
    if (!selectedService) return toast.error("Please select a service!");

    const customerId = String(localStorage.getItem("userId"));
    if (!customerId) return toast.error("User is not logged in!");

    const serviceId = "67fc8cba88240f3b0067c355";

    const bookingData = {
      serviceId,
      customerId,
      customerName,
      serviceName: selectedService,
      date: selectedDate,
      time: selectedTime,
      address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/book",
        bookingData
      );

      if (response.data.message === "Booking created successfully!") {
        toast.success("Booking Confirmed! Redirecting to Payment...");

        const paymentRes = await axios.post(
          "http://localhost:5000/api/auth/payment",
          {
            amount: 0.05,
            serviceName: selectedService,
          }
        );

        const sessionId = paymentRes.data.sessionId;

        if (!sessionId) {
          toast.error("Payment session creation failed!");
          return;
        }

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.error("Stripe Checkout Error:", error);
          toast.error("Payment redirection failed: " + error.message);
        }
      }
    } catch (err) {
      console.error(
        "Booking/payment failed:",
        err.response?.data || err.message
      );
      toast.error(
        "Booking/payment failed: " + (err.response?.data.message || err.message)
      );
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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: pageBackground }}
    >
      <form
        id="bookingForm"
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-2xl rounded-xl p-10 flex flex-col gap-6 w-full max-w-md border border-gray-300 transition-all duration-700 hover:shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold text-center text-black mb-4 tracking-widest">
          Book Your Service
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500 resize-none h-[100px]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Select Time
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Select Service
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
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

        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg hover:scale-[1.04] hover:bg-gray-900 transition-transform duration-500"
        >
          Confirm Booking
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Booking;
