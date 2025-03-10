import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import TypewWritter from "./TypewWritter";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

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

    try {
      const url = isSignUp
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const payload = isSignUp
        ? { username, email, password }
        : { email, password };

      const response = await axios.post(url, payload);
      setIsAuthenticated(true);
      setUser(response.data.user || response.data);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || response.data)
      );
      localStorage.setItem("isAuthenticated", "true");
      hideSidemenu(); // Hide menu after successful login
      toast.success("Login Successful!"); // Show notification
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      toast.error("Login Failed!");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen bg-black opacity-30 transition-opacity duration-[900ms] z-10 ${
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
          <div>
            {!isSignUp && (
              <div className="bg-black text-white w-[300px] px-4 py-2 rounded-lg hover:scale-[1.04] duration-700 cursor-pointer flex justify-evenly items-center">
                <p>Sign In using Google</p>
                <FcGoogle />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm w-[100vw] h-[10vh] flex justify-evenly items-center fixed top-0 z-0">
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
                <h1 className="mb-0 leading-tight">Assist</h1>
              </div>
            </div>
            <div className="w-44">
              <TypewWritter
                words={["Smart😎", "Reliable🤝", "Secure🛡️", "Fast🏎️💨"]}
              />
            </div>
          </div>

          {/* Search Inputs */}
          <input
            className="border rounded-full border-gray-200 text-gray-400 focus:outline-gray-400 shadow-sm p-1 h-[40px] w-[250px] text-center"
            type="text"
            placeholder="Enter Your Location📍"
          />
          <input
            className="border rounded-full shadow-sm border-gray-200 text-gray-400 p-1 h-[40px] w-[250px] text-center focus:outline-gray-400"
            type="text"
            placeholder="What are you looking for?"
          />

          {/* Avatar / Sign In Button */}
          <div className="relative">
            <button
              title={isAuthenticated ? "Hello User" : "Sign In / Sign Up"}
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
              <div className="absolute top-[6vh] float-right bg-white shadow-lg rounded-lg p-4 w-[200px]">
                <p className="text-black font-semibold">{user?.username}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => {
                    setIsAuthenticated(false);
                    setUser(null);
                    setShowDropdown(false);

                    localStorage.removeItem("user");
                    localStorage.removeItem("isAuthenticated");

                    toast.success("Logout", {
                      icon: "✔️", // Custom tick icon
                      style: { color: "red" },
                      progressStyle: { background: "red" },
                    });
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
