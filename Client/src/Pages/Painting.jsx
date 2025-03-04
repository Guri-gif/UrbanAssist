import Navbar from "../Components/Navbar";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";

const Painting = () => {
  return (
    <>
      <Navbar />
      <div className="w-auto h-[500px] flex gap-[50px] mx-[100px] mt-[20vh]">
        <div className="w-[25%] h-auto flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[150px]">
            Painting & Waterproofing
          </h1>
          <Review img="src/assets/star.png" review="4.8 (20k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
        </div>
        <div className="w-[75%] h-auto"></div>
      </div>
    </>
  );
};

export default Painting;