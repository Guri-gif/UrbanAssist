import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

import PropTypes from "prop-types";

const Marque = ({ autoplay = true, reviews = [] }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = reviews.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  });

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        What Our Users Say
        <br />
        <span className="text-gray-500 text-lg">Real Reviews, Real Trust!</span>
      </h1>

      <div className="flex items-center justify-center h-[400px] overflow-hidden shadow-xl rounded-xl bg-gray-100">
        <motion.div
          drag="x"
          dragElastic={0.1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {reviews.map(({ username, userImage, review }, i) => (
            <div
              key={i}
              className="absolute flex h-fit items-center justify-center p-6 transition-transform"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div className="flex flex-col items-center text-center text-white shadow-lg rounded-xl bg-gray-700 p-6 hover:scale-105 transition-all duration-500">
                <img
                  src={userImage}
                  alt="user"
                  className="h-16 w-16 rounded-full border-4 border-white object-cover mb-3 shadow-md"
                />
                <p className="font-semibold text-lg">{username}</p>
                <p className="text-gray-300 text-sm italic">{review}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

Marque.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      userImage: PropTypes.string,
      review: PropTypes.string,
    })
  ),
  autoplay: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

export default Marque;
