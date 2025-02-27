import Navbar from "../Components/Navbar";
const Painting = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-auto h-[600px] flex gap-[50px] border mx-[100px] mt-[10vh]">
        <div className="w-[25%] h-auto border">
          <h1 className="text-3xl font-semibold w-[150px]">
            Painting & Waterproofing
          </h1>
          
        </div>
        <div className="w-[75%] h-auto border"></div>
      </div>
    </>
  );
};

export default Painting;
