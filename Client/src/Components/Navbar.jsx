import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import TypewWritter from "./TypewWritter";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import instance from "../axiosInstance";
import { apiURL } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
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

  const fetchLocations = async (searchText) => {
    if (searchText.length < 2) return;
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}&limit=4`
    );
    setSuggestions(res.data);
    localStorage.setItem("Locations", JSON.stringify(res.data));
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
            src="src/assets/logo.png"
            alt=""
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
                  src="src/assets/logo.png"
                  alt=""
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

          {/* Search Inputs */}
          <div>
            <input
              className="border rounded-full text-gray-400 shadow-sm p-1 h-[40px] w-[250px] text-center"
              type="text"
              placeholder="Enter Your Location📍"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchLocations(e.target.value);
              }}
            />
            <ul className="absolute bg-white shadow-md w-[250px]">
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setQuery(place.display_name);
                    setSuggestions([]);
                  }}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          </div>
          <input
            className="border rounded-full shadow-sm border-gray-200 text-gray-400 p-1 h-[40px] w-[250px] text-center focus:outline-gray-400"
            type="text"
            placeholder="What are you looking for?"
          />

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
                  src="src/assets/user.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              )}
              <ToastContainer />
            </button>

            {/* User Dropdown */}
            {showDropdown && isAuthenticated && (
              <div className="absolute top-[6vh] right-[-100] bg-white shadow-lg rounded-lg p-4 w-[200px]">
                <p className="text-black font-semibold">{username}</p>
                <p className="text-gray-500 text-sm">{email}</p>

                {/* Logout Button (Not inside another button) */}
                <div className="mt-2">
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setUser(null);
                      setShowDropdown(false);

                      localStorage.removeItem("user");
                      localStorage.removeItem("isAuthenticated");

                      toast.success(`Bye ${username}, come back soon`, {
                        style: { color: "black", background: "white" },
                        progressStyle: { background: "red" },
                      });
                    }}
                  >
                    Logout
                  </button>
                </div>

                {/* Delete Account Button (Not inside another button) */}
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
