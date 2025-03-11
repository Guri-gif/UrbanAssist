import Navbar from "../Components/Navbar";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
// import Testimonials from "../Components/Testimonials";

const Painting = () => {
  return (
    <>
      <Navbar />
      <div className="w-auto h-[500px] flex gap-[50px] mx-[100px] my-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[150px]">
            Painting & Waterproofing
          </h1>
          <Review img="src/assets/star.png" review="4.8 (20k reviews)"/>
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
            <button className="bg-black text-white rounded-lg py-2 cursor-pointer hover:scale-[1.01] duration-700">Book Now!</button>
          </PromiseBlock>
        </div>
        <div className="w-[75%] h-auto flex">
          <img className="w-[50%] h-fit" src="src/assets/painter1.jpg" alt="" loading="lazy"/>
          <img className="w-[50%] h-fit" src="src/assets/painter2.jpg" alt="" loading="lazy"/>
        </div>
      </div>
      {/* <div className="w-[400px] h-auto p-[30px] my-[250px] mx-[600px]">
          <h1>At-home consultation</h1>
          <div className="flex gap-2">
            <p className="font-light">40rs</p>
            <p className="font-light">60mins</p>
          </div>
      </div> */}
    </>
  );
};

export default Painting;
