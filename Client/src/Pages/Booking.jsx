import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");  // Added service selection state
  const [pageBackground, setPageBackground] = useState("#f4f4f9");

  const navigate = useNavigate();

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

    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time!");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address!");
      return;
    }

    if (!selectedService) {
      toast.error("Please select a service!");
      return;
    }

    const customerId = String(localStorage.getItem("userId"));
    if (!customerId) {
      toast.error("User is not logged in!");
      return;
    }

    const serviceId = "67fc8cba88240f3b0067c355";  // Your hardcoded serviceId

    const bookingData = {
      serviceId,
      customerId,
      customerName,
      serviceName: selectedService,  // Adding serviceName to the data
      date: selectedDate,
      time: selectedTime,
      address,
    };

    console.log("Booking Data:", bookingData); // Debugging to check the payload

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/book",
        bookingData
      );
      console.log(response.data);

      if (response.data.message === "Booking created successfully!") {
        toast.success("Booking Confirmed! 🎉");
        sendNotificationToServiceProvider(bookingData);
        navigate("/");
      }
    } catch (err) {
      console.error("Booking failed:", err.response ? err.response.data : err.message);
      toast.error("Booking failed! " + (err.response ? err.response.data.message : err.message));
    }
  };

  const sendNotificationToServiceProvider = (bookingData) => {
    toast.info(
      `New booking from ${bookingData.customerId}! Check your dashboard.`,
      {
        position: "top-right",
        autoClose: 5000,
      }
    );
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

        {/* Customer Name */}
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

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
          />
        </div>

        {/* Address */}
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

        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
            required
          />
        </div>

        {/* Time Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Select Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
            required
          />
        </div>

        {/* Service Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Select Service</label>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg hover:scale-[1.04] hover:bg-gray-900 transition-transform duration-500"
        >
          Confirm Booking
        </button>

        {/* Toast Container */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default Booking;
