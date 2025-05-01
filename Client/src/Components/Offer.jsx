import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Offer = ({ price, offer, heading, page }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(page);
    } else {
      toast.warning("Please login to continue");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="h-auto border border-gray-400 rounded-lg flex flex-col gap-4 p-5" // Adjusted padding and spacing
    >
      <h1 className="text-lg font-semibold">{heading}</h1>
      <div className="flex gap-2">
        <p className="font-light text-gray-500">
          <strike>{price}</strike>
        </p>
        <p className="font-semibold text-green-500">{offer}</p>
      </div>
      <button
        onClick={handleClick}
        className="bg-black text-white w-[200px] rounded-lg py-2 cursor-pointer hover:scale-[1.01] duration-700 mt-4" // Added margin-top for better spacing between button and content
      >
        Book Now!🎉
      </button>
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
