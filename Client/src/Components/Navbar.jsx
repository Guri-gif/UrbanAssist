import TypewWritter from "./TypewWritter";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-white shadow-sm w-[100vw] h-[10vh] flex justify-evenly items-center">
        <div className="mx-[200px] flex items-center h-full">
          <div className="flex items-center space-x-2 hover:cursor-pointer hover:scale-[1.05] duration-700">
            <img
              className="w-[40px] h-[40px] shadow-lg rounded-lg"
              src="src\assets\logo.png"
              alt=""
            />
            <div className="flex-col items-center gap-0">
              <div></div>
              <h1 className="mb-0 leading-tight">Urban</h1>
              <h1 className="mb-0 leading-tight">Assist</h1>
            </div>
          </div>
          <TypewWritter
            words={["Smart😎", "Relaible🤝", "Secure🛡️", "Fast🏎️💨"]}
          ></TypewWritter>
        </div>
        <div>
          <input
            className="border rounded-full border-gray-200 active:border-gray-200 shadow-2xs p-1 h-[40px] w-[250px] text-center"
            type="text"
            name=""
            id=""
            placeholder="📍Enter Your Location"
          />
        </div>
        <div>
          <input
            className="border rounded-full border-gray-200 active:border-gray-200 shadow-2xs p-1 h-[40px] w-[250px] text-center"
            type="text"
            name=""
            id=""
            placeholder="What You are looking for?"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
