import PropTypes from "prop-types";

function Ratings({ img, name, rating }) {
  return (
    <div className="flex gap-2">
      <img className="w-[50px] h-[50px]" src={img} alt="" />
      <div className="flex flex-col ml-2">
        <h1>{rating}</h1>
        <p className="font-light text-gray-400">{name}</p>
      </div>
    </div>
  );
}

Ratings.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Ratings;
