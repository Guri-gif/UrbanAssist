import Typewriter from "typewriter-effect";
import PropTypes from "prop-types";

const TypewWritter = ({ words }) => {
  return (
    <div className="font-bold text-gray-500 ml-16">
      <Typewriter
        options={{
          strings: words || [], // Ensures words is always an array
          autoStart: true,
          loop: true,
          delay: 70,
          deleteSpeed: 60,
          cursor: "",
          pauseFor: 150,
          startDelay: 500,
        }}
      />
    </div>
  );
};

TypewWritter.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TypewWritter;
