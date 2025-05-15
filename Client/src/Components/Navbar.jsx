import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import TypewWritter from "./TypewWritter";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import instance from "../axiosInstance";
import { apiURL } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const availableServices = [
    { name: "Women Makeup", path: "/makeup" },
    { name: "Mens Grooming", path: "/grooming" },
    { name: "Appliance Repair", path: "/repairing" },
    { name: "Cleaning", path: "/cleaning" },
    { name: "Handymen", path: "/handymen" },
    { name: "Painter", path: "/painting" },
  ];

  const showLogin = () => {
    setToggle(!toggle);
    setIsSignUp(false);
  };

  const hideSidemenu = () => {
    setToggle(false);
    setIsSignUp(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleDefault = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isSignUp
        ? `${apiURL}/api/auth/register`
        : `${apiURL}/api/auth/login`;

      const payload = isSignUp
        ? { username, email, password }
        : { email, password };

      const response = await instance.post(url, payload);
      console.log("API Response:", response.data);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const userData =
        response.data.data || response.data.user || response.data;

      if (!userData || !userData._id) {
        throw new Error("Invalid user data received!");
      }

      setIsAuthenticated(true);
      setUser(userData);
      setEmail(userData.email);
      setUsername(userData.username);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData._id);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", response.data.token);

      setShowDropdown(false);
      hideSidemenu();
      toast.success(
        isSignUp
          ? `Welcome ${userData.username}!`
          : `Welcome back ${userData.username}!`
      );
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(isSignUp ? "Registration Failed!" : "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSearch = (searchText) => {
    if (searchText.length < 1) {
      setSuggestions([]);
      return;
    }

    const matchedServices = availableServices.filter((service) =>
      service.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setSuggestions(matchedServices);
  };

  const handleServiceSelect = (service) => {
    setQuery(service.name);
    setSuggestions([]);
    navigate(service.path);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setUsername(storedUsername || "User");
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const deleteAccount = async () => {
    if (!user || !user._id) {
      toast.error("User not found!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not found!");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/deleteUser/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Account deleted successfully!", {
          style: { color: "green" },
        });
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setShowDropdown(false);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Unauthorized! only for admin use");
    }
  };

  const userBookingData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("No User with Such id");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not found");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/userBookingData/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the data is in response.data or response.data.data
      const data = response.data.data || response.data;
      setBookingData(Array.isArray(data) ? data : [data]);
      setShowBookingModal(true);
      console.log("Booking data:", data);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch booking data"
      );
    }
  };
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const navy = document.getElementById("navy");

    gsap.from(navy, {
      y: -100,
      duration: 1,
    });
  });

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen bg-black opacity-30 transition-opacity duration-[900ms] z-20 ${
          toggle ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={hideSidemenu}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed top-[100px] left-0 w-[35vw] h-[70vh] bg-gray-200 shadow-2xl rounded-xl transition-transform duration-[700ms] z-20 ${
          toggle ? "translate-x-130" : "-translate-x-full"
        }`}
        onClick={handleMenuClick}
      >
        <div className="flex justify-center items-center w-full h-full flex-col relative gap-[20px]">
          <img
            className="w-[70px] h-[70px] rounded-lg shadow-xl"
            src="/logo.png"
            alt="Logo"
          />
          {loading ? (
            <Loading />
          ) : (
            <form action="" className="flex flex-col gap-5">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="border-2 border-gray-400 rounded-lg py-2 px-4 w-[300px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <input
                type="email"
                placeholder="Enter Your Email"
                className="border-2 border-gray-400 rounded-lg py-2 px-4 w-[300px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="border-2 border-gray-400 rounded-lg py-2 px-4 w-[300px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleDefault}
                className="bg-black text-white w-[300px] px-4 py-2 rounded-lg hover:scale-[1.04] duration-700 cursor-pointer"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
          )}
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-gray-400 cursor-pointer hover:underline duration-[2s]"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
          {!isSignUp && <p>OR</p>}
          <div>{!isSignUp && <CustomButton />}</div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        id="navy"
        className="bg-white shadow-sm w-[100vw] h-[10vh] flex justify-evenly items-center fixed top-0 z-10"
      >
        <div className="bg-white w-[70vw] h-[10vh] flex justify-evenly items-center mx-[300px]">
          <div className="flex items-center h-full">
            <div className="flex items-center space-x-2">
              <NavLink to={"/"}>
                <img
                  className="w-[40px] h-[40px] shadow-lg rounded-lg hover:cursor-pointer hover:scale-[1.05] duration-700"
                  src="/logo.png"
                  alt="Logo"
                />
              </NavLink>

              <div className="flex-col items-center gap-0">
                <h1 className="mb-0 leading-tight">Urban</h1>
                <h1 className="mt-0 leading-tight">Assist</h1>
              </div>
            </div>
            <div className="w-44">
              <TypewWritter
                words={["Smart😎", "Reliable🤝", "Secure🛡️", "Fast🏎️💨"]}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              className="border rounded-full shadow-sm border-gray-200 text-gray-400 p-1 h-[40px] w-[250px] text-center focus:outline-gray-400"
              type="text"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleServiceSearch(e.target.value);
              }}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white shadow-md w-[250px] z-30 mt-1 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                {suggestions.map((service, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="p-2">{service.name}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Avatar / Sign In Button */}
          <div className="relative">
            <button
              title={
                isAuthenticated ? `Hello ,${username}` : "Sign In / Sign Up"
              }
              className="fixed right-10 top-[24px]"
              onClick={() => {
                if (isAuthenticated) {
                  setShowDropdown(!showDropdown);
                } else {
                  showLogin();
                }
              }}
            >
              {!isAuthenticated ? (
                !toggle ? (
                  <FontAwesomeIcon
                    icon={faSignature}
                    style={{
                      color: "#000000",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <IoMdCloseCircleOutline
                    className="w-8 h-8 text-black"
                    onClick={hideSidemenu}
                  />
                )
              ) : (
                <img
                  src="/user.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              )}
              <ToastContainer />
            </button>

            {/* User Dropdown */}
            {showDropdown && isAuthenticated && (
              <div className="absolute z-60 top-[6vh] right-[-100] bg-white shadow-lg rounded-lg p-4 w-[200px]">
                <p className="text-black font-semibold">{username}</p>
                <p className="text-gray-500 text-sm">{email}</p>

                {/* My Bookings Button */}
                <div className="mt-2">
                  <button
                    className="text-blue-500 cursor-pointer"
                    onClick={userBookingData}
                  >
                    My Bookings
                  </button>
                </div>

                {/* Logout Button */}
                <div className="mt-2">
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setUser(null);
                      setShowDropdown(false);
                      localStorage.removeItem("user");
                      localStorage.removeItem("isAuthenticated");
                      localStorage.removeItem("token");
                      toast.success(`Bye ${username}, come back soon`, {
                        style: { color: "black", background: "white" },
                        progressStyle: { background: "red" },
                      });
                    }}
                  >
                    Logout
                  </button>
                </div>

                {/* Delete Account Button */}
                <div className="mt-2">
                  <button
                    onClick={deleteAccount}
                    className="text-red-500 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete Account
                  </button>
                </div>
              </div>
            )}
            {showBookingModal && (
              <>
                {/* Dark Overlay */}

                <div className="fixed inset-0 flex items-center justify-center z-50 top-[400px]">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto relative">
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                      <h2 className="text-xl font-bold">My Bookings</h2>
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                      {bookingData ? (
                        <div className="space-y-4">
                          {bookingData.length > 0 ? (
                            bookingData.map((booking, index) => {
                              const bookingDetails = booking.data || booking;
                              return (
                                <div
                                  key={index}
                                  className="border-b pb-4 last:border-b-0"
                                >
                                  <p className="font-semibold">
                                    Booking #{index + 1}
                                  </p>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Date:
                                      </p>
                                      <p>
                                        {bookingDetails.date
                                          ? new Date(
                                              bookingDetails.date
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Time:
                                      </p>
                                      <p>{bookingDetails.time || "N/A"}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Service:
                                      </p>
                                      <p>
                                        {bookingDetails.serviceName || "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Status:
                                      </p>
                                      <p
                                        className={`capitalize ${
                                          bookingDetails.status === "accepted"
                                            ? "text-green-500"
                                            : bookingDetails.status ===
                                              "cancelled"
                                            ? "text-red-500"

                                            :bookingDetails.status === 'pending'
                                            ? "text-yellow-500"
                                            :bookingData

                                        }`}
                                      >
                                        {bookingDetails.status || "N/A"}
                                      </p>
                                    </div>
                                    {bookingDetails.address && (
                                      <div className="col-span-2">
                                        <p className="text-sm text-gray-600">
                                          Address:
                                        </p>
                                        <p>{bookingDetails.address}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-4">
                              <p>No bookings found.</p>
                              <button
                                onClick={() => {
                                  setShowBookingModal(false);
                                  navigate("/services");
                                }}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                              >
                                Book a Service Now
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-20">
                          <Loading />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
