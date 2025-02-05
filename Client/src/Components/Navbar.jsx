import TypewWritter from "./TypewWritter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const showLogin = () => {
    setToggle(!toggle);
  };

  const hideSidemenu = () => {
    setToggle(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevents closing when clicking inside
  };

  return (
    <>
      {/* Black overlay */}
      <div
        className={`absolute top-0 left-0 w-screen h-screen bg-black opacity-30 transition-opacity duration-700 z-10${
          toggle ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={hideSidemenu}
      ></div>

      {/* Side menu */}
      <div
        className={`fixed top-[100px] left-0 w-[35vw] h-[65vh] bg-gray-200 shadow-2xl transition-transform duration-300 z-20 ${
          toggle ? "translate-x-125" : "-translate-x-full"
        }`}
        onClick={handleMenuClick}
      ></div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm w-full h-[10vh] flex justify-evenly items-center fixed top-0 z-0">
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
            <FontAwesomeIcon
              icon={faSignature}
              style={{ color: "#000000", fontSize: "24px", cursor: "pointer"}}
            />
            <IoMdCloseCircleOutline
              className={` cursor-pointer text-9xl${
                toggle ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onClick={hideSidemenu}
            />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
