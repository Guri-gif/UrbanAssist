import Ratings from "./Ratings";
import Videos from "./videos";
import { NavLink } from "react-router-dom";

export default function HeaderSection() {
  return (
    <>
      <header className="flex w-[100vw] h-[90vh] mt-[10vh]">
        <section className="w-[50%] h-auto pl-10">
          <h1 className="text-black font-bold text-3xl py-10 flex items-center gap-2 ">
            Service at Your Doorstep{" "}
            <img className="w-[50px]" src="src/assets/door.png" alt="" />
          </h1>
          <p className="text-gray-400 text-xl text-center">
            What You looking for?
          </p>
          <div className="w-50% h-auto grid grid-cols-3 grid-rows-2 p-12 gap-10">
            <NavLink to="/makeup" end>
              {" "}
              <Videos video="src/assets/makeup.mp4" title="Women Makeup" />
            </NavLink>
            <NavLink to={"/grooming"}>
              {" "}
              <Videos video="src/assets/grooming.mp4" title="Mens Grooming" />
            </NavLink>
            <NavLink to={"/repairing"}>
              <Videos video="src/assets/repair.mp4" title="Appliance Repair" />
            </NavLink>
            <NavLink to={"/cleaning"}>
              <Videos video="src/assets/cleaning.mp4" title="Cleaning" />
            </NavLink>
            <NavLink to={"/handymen"}>
              <Videos video="src/assets/basic.mp4" title="Handymen" />
            </NavLink>
            <NavLink to="/painting" end>
              <Videos video="src/assets/paint.mp4" title="Painter" />
            </NavLink>
          </div>
          <div className="flex justify-between px-10">
            <Ratings
              img="src/assets/star.png"
              name="Service Rating"
              rating={parseFloat("4.8")}
            ></Ratings>
            <Ratings
              img="src/assets/people.png"
              name="Customers Globally"
              rating="12M+"
            ></Ratings>
          </div>
        </section>
        <section></section>
      </header>
    </>
  );
}
