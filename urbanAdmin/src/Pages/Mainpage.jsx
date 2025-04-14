import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet} from "react-router-dom";

const Mainpage = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Mainpage;
