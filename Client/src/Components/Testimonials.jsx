import PropTypes from "prop-types";

const Testimonials = ({ text, author }) => {
  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="italic text-gray-700">{text}</p>
      <p className="text-right font-semibold text-gray-900">- {author}</p>
    </div>
  );
};

Testimonials.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Testimonials;
