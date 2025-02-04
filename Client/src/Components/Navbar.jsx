import TypewWritter from "./TypewWritter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow-sm w-full h-[10vh] flex justify-evenly items-center">
        <div  className=" bg-white w-[70vw] h-[10vh] flex justify-evenly items-center mx-[300px]">
          <div className="flex items-center h-full">
            <div className="flex items-center space-x-2">
              <img
                className="w-[40px] h-[40px] shadow-lg rounded-lg hover:cursor-pointer hover:scale-[1.05] duration-700"
                src="src\assets\logo.png"
                alt=""
              />
              <div className="flex-col items-center gap-0">
                <h1 className="mb-0 leading-tight">Urban</h1>
                <h1 className="mb-0 leading-tight">Assist</h1>
              </div>
            </div>
            <div className="w-44">
              <TypewWritter
                words={["Smart😎", "Relaible🤝", "Secure🛡️", "Fast🏎️💨"]}
              ></TypewWritter>
            </div>
          </div>
          <div>
            <input
              className="border rounded-full border-gray-200 text-gray-400 focus:outline-gray-400 shadow-2xs p-1 h-[40px] w-[250px] text-center"
              type="text"
              name=""
              id=""
              placeholder="Enter Your Location📍"
            />
          </div>
          <div>
            <input
              className="border rounded-full border-gray-200 text-gray-400 shadow-2xs p-1 h-[40px] w-[250px] text-center focus:outline-gray-400"
              type="text"
              name=""
              id=""
              placeholder="What You are looking for?"
            />
          </div>
          <div>
            <a href="" title="Sign In/Sign Up">
              {" "}
              <FontAwesomeIcon
                icon={faSignature}
                style={{ color: "#000000", fontSize: "24px" }}
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
