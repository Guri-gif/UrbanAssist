import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";

const Booking = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [pageBackground, setPageBackground] = useState("#f4f4f9");

  // Random color background for unique pages
  const generateRandomBackground = () => {
    const colors = ["#f4f4f9", "#e0f7fa", "#fff3e0", "#fce4ec", "#ffecb3"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    setPageBackground(generateRandomBackground());

    const storedUsername = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("email") || "";

    setUsername(storedUsername);
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Please enter your address! 🏡", {
        position: "top-center",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time! 🕒", {
        position: "top-center",
      });
      return;
    }

    // Prepare the data to send to the backend
    const bookingData = {
      serviceId: "67fc8cba88240f3b0067c355", // This should be dynamic, set based on the selected service
      serviceProviderId: "67fc8cba88240f3b0067c355", // This should be dynamic, set based on the selected provider
      customerId: "67dba6b4c469ec20dd255842", // This should be dynamic, set based on the logged-in user
      date: selectedDate,
      time: selectedTime,
    };

    try {
      // Send booking data to the backend API
      const response = await axios.post("http://localhost:5000/api/auth/book", bookingData);

      if (response.data.message === "Booking created successfully!") {
        toast.success("Booking Confirmed! 🎉", {
          position: "top-center",
        });

        // Optionally, trigger a notification for the service provider here
        sendNotificationToServiceProvider(response.data.data);
        
        // Clear the form
        setAddress("");
        setSelectedDate("");
        setSelectedTime("");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      toast.error("Booking failed. Please try again!", {
        position: "top-center",
      });
    }
  };

  const sendNotificationToServiceProvider = (bookingData) => {
    // Here, you can implement logic to send a popup, email, or in-app notification.
    // For now, let's simulate it with a toast notification for the service provider.

    toast.info(`New booking from ${bookingData.customerId}! Check your dashboard.`, {
      position: "top-right",
      autoClose: 5000,
    });

    // You can replace this with an API call to send an email or real-time notification
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

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={username}
            readOnly
            className="w-full p-3 rounded-lg bg-white border-b-2 border-gray-400 focus:outline-none focus:border-black transition-all duration-500"
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
