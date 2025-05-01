import Ratings from "./Ratings";
import Videos from "./Videos";
import { NavLink } from "react-router-dom";

export default function HeaderSection() {
  return (
    <>
      <header className="flex w-[100vw] h-[90vh] mt-[10vh]">
        <section className="w-[50%] h-auto pl-10">
          <h1 className="text-black font-bold text-3xl py-10 flex items-center gap-2 ">
            Service at Your Doorstep{" "}
            <img className="w-[50px]" src="/door.png" alt="" />
          </h1>
          <p className="text-gray-400 text-xl text-center">What You looking for?</p>
          <div className="w-50% h-auto grid grid-cols-3 grid-rows-2 p-12 gap-10">
            <NavLink to="/makeup" end className="transform hover:scale-105 duration-700">
              <Videos video="/makeup.mp4" title="Women Makeup" />
            </NavLink>
            <NavLink to="/grooming" className="transform hover:scale-105 duration-700">
              <Videos video="/grooming.mp4" title="Mens Grooming" />
            </NavLink>
            <NavLink to="/repairing" className="transform hover:scale-105 duration-700">
              <Videos video="/repair.mp4" title="Appliance Repair" />
            </NavLink>
            <NavLink to="/cleaning" className="transform hover:scale-105 duration-700">
              <Videos video="/cleaning.mp4" title="Cleaning" />
            </NavLink>
            <NavLink to="/handymen" className="transform hover:scale-105 duration-700">
              <Videos video="/basic.mp4" title="Handymen" />
            </NavLink>
            <NavLink to="/painting" end className="transform hover:scale-105 duration-700">
              <Videos video="/paint.mp4" title="Painter" />
            </NavLink>
          </div>
          <div className="flex justify-between px-10">
            <Ratings img="/star.png" name="Service Rating" rating={4.8} />
            <Ratings img="/people.png" name="Customers Globally" rating="12M+" />
          </div>
        </section>
        <section></section>
      </header>
    </>
  );
}