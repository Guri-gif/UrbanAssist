import PropTypes from "prop-types";

const Offer = ({ price }) => {
  return (
    <div className=" h-auto border border-gray-400 rounded-lg flex p-[20px] flex-col gap-4">
      <h1>At-home consultation</h1>
      <div className="flex gap-1 h-auto">
        <p className="font-light">
          <strike>{price}</strike>
        </p>
        <p className="font-light">Get Your First Consultation free</p>
      </div>
      <button className="bg-black border text-white w-[200px] rounded-lg py-2 cursor-pointer hover:scale-[1.01] duration-700">
        Book Now!🎉
      </button>
    </div>
  );
};

Offer.propTypes = {
  price: PropTypes.string.isRequired,
};

export default Offer;
