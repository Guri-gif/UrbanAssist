import PropTypes from "prop-types";

const Promise = ({ text }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <img className="w-[30px]" src="/tick.png" alt="" />
      <p className="font-light">{text}</p>
    </div>
  );
};

Promise.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Promise;
