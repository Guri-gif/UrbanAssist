import TypewWritter from "./TypewWritter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const showLogin = () => {
    setToggle(!toggle);
    setIsSignUp(false); // Reset to login when opening
  };

  const hideSidemenu = () => {
    setToggle(false);
    setIsSignUp(false); // Reset mode when closing
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleDefault = (e) => {
    e.preventDefault();
    console.log("Form submited successfullly");
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen bg-black opacity-30 transition-opacity duration-[900ms] z-10 ${
          toggle ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={hideSidemenu}
      ></div>

      {/* Side menu */}
      <div
        className={`fixed top-[100px] left-0 w-[35vw] h-[70vh] bg-gray-200 shadow-2xl transition-transform duration-[700ms] z-20 ${
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
              />
            )}
            <input
              type="mail"
              placeholder="Enter Your Email"
              className="border-2 border-gray-400 rounded-lg py-2 px-4 w-[300px]"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="border-2 border-gray-400 rounded-lg py-2 px-4 w-[300px]"
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
              <img
                className="w-[40px] h-[40px] shadow-lg rounded-lg hover:cursor-pointer hover:scale-[1.05] duration-700"
                src="src/assets/logo.png"
                alt=""
              />
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

          {/* Login Button */}
          <button
            title="Sign In/Sign Up"
            className="fixed right-10 top-[24px]"
            onClick={showLogin}
          >
            {!toggle && (
              <FontAwesomeIcon
                icon={faSignature}
                style={{
                  color: "#000000",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            )}
            {toggle && (
              <IoMdCloseCircleOutline
                className="w-8 h-8 text-black"
                onClick={hideSidemenu}
              />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
