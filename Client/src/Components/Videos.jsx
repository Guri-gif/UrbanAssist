import PropTypes from "prop-types";

const Videos = ({ video, title }) => {
  return (
    <div>
      <video
        muted
        loop
        autoPlay
        className="rounded-lg shadow-lg hover:scale-[1.02] duration-[300ms]"
        src={video}
      ></video>
      <p className="text-center">{title}</p>
    </div>
  );
};

// Prop validation
Videos.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Videos;
