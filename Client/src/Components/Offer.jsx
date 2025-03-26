import PropTypes from "prop-types";
import { NavLink } from "react-router";

const Offer = ({ price, offer, heading, page }) => {
  return (
    <div className=" h-auto border border-gray-400 rounded-lg flex p-[20px] flex-col gap-4">
      <h1>{heading}</h1>
      <div className="flex gap-1 h-auto">
        <p className="font-light">
          <strike>{price}</strike>
        </p>
        <p className="font-light">{offer}</p>
      </div>
      <NavLink to={page}>
        <button
          className="bg-black border text-white w-[200px] rounded-lg py-2 cursor-pointer hover:scale-[1.01] duration-700"
        >
          Book Now!🎉
        </button>
      </NavLink>
    </div>
  );
};

Offer.propTypes = {
  price: PropTypes.string.isRequired,
  offer: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Offer;
