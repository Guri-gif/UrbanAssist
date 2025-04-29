import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Videos = ({ video, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      videoRef.current,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
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
