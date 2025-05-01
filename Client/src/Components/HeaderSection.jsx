import Ratings from "./Ratings";
import Videos from "./Videos";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaWallet } from "react-icons/fa";

export default function HeaderSection() {
  return (
    <>
      <header className="flex w-[100vw] h-[90vh] mt-[10vh]">
        {/* Left Section (Services Grid) */}
        <section className="w-[50%] h-auto pl-10">
          <h1 className="text-black font-bold text-3xl py-10 flex items-center gap-2">
            Service at Your Doorstep{" "}
            <img className="w-[50px]" src="/door.png" alt="Door icon" />
          </h1>
          <p className="text-gray-400 text-xl text-center">What You looking for?</p>
          <div className="w-50% h-auto grid grid-cols-3 grid-rows-2 p-12 gap-10">
            {services.map((service) => (
              <NavLink 
                to={service.path} 
                key={service.path}
                className="transform hover:scale-105 duration-700"
              >
                <Videos video={service.video} title={service.title} />
              </NavLink>
            ))}
          </div>
          <div className="flex justify-between px-10">
            <Ratings img="/star.png" name="Service Rating" rating={4.8} />
            <Ratings img="/people.png" name="Customers Globally" rating="12M+" />
          </div>
        </section>

        {/* Right Section (Hero Visual) */}
        <section className="w-[50%] h-full relative flex flex-col justify-center items-center bg-white p-10">
          {/* Animated Phone Mockup */}
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 20 }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative w-[300px] h-[500px] bg-white rounded-3xl shadow-xl border-8 border-gray-800 overflow-hidden"
          >
            <div className="absolute top-0 w-full bg-gray-800 h-8 rounded-t-lg"></div>
            <img 
              src="/logo.png" 
              alt="App preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-bold">UrbanAssist App Coming Soon!!</h3>
              <p className="text-white text-sm">Book services in just 3 taps!</p>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <div className="mt-12 grid grid-cols-3 gap-6 w-full px-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <div className="text-blue-500 text-2xl mb-2 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* App Download CTA */}
          <div className="mt-8 flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <img src="https://cdn2.downdetector.com/static/uploads/logo/App_Store_iOS_1.png" alt="" className="h-6" />
              App Store
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <img src="https://c.clc2l.com/t/g/o/google-playstore-Iauj7q.png" alt="" className="h-6" />
              Google Play
            </button>
          </div>
        </section>
      </header>
    </>
  );
}

// Data for cleaner JSX
const services = [
  { title: "Women Makeup", path: "/makeup", video: "/makeup.mp4" },
  { title: "Mens Grooming", path: "/grooming", video: "/grooming.mp4" },
  { title: "Appliance Repair", path: "/repairing", video: "/repair.mp4" },
  { title: "Cleaning", path: "/cleaning", video: "/cleaning.mp4" },
  { title: "Handymen", path: "/handymen", video: "/basic.mp4" },
  { title: "Painter", path: "/painting", video: "/paint.mp4" }
];

const steps = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Choose Location",
    description: "Enter your address to find nearby professionals"
  },
  {
    icon: <FaRegCalendarAlt />,
    title: "Schedule",
    description: "Pick a date and time that works for you"
  },
  {
    icon: <FaWallet />,
    title: "Pay Securely",
    description: "Cashless payment with protection"
  }
];