import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

import PropTypes from "prop-types";

const IMGS = [
  "https://img.freepik.com/free-photo/empty-minimal-room-interior-design-with-pastel-blue-wall_53876-145506.jpg?t=st=1742273761~exp=1742277361~hmac=75c35935b2c3a5e1df8911bd25cdff06436daa146947ab105e228e5f4c276e97&w=1380",
  "https://img.freepik.com/free-photo/sofa-living-room-with-copy-space_43614-869.jpg?t=st=1742274372~exp=1742277972~hmac=040fe17e3b7b940ea1c036dc040f9910ca618e712b543f936535a38234ba4458&w=1380",
  "https://img.freepik.com/free-photo/yellow-armchair-living-room-with-copy-space_43614-940.jpg?t=st=1742274444~exp=1742278044~hmac=f1939ab2d1a85670f81dbb2c8652aca5daffbdf0773d9096945acadc29e484c7&w=1060",
  "https://img.freepik.com/free-photo/retro-living-room-interior-design_53876-145503.jpg?t=st=1742274469~exp=1742278069~hmac=9217f6e9c9b704cb115912ccbe6148e6095a9d6364857fbca55cfdab67df28a3&w=1380",
  "https://img.freepik.com/free-photo/gray-sofa-brown-living-room-with-copy-space_43614-954.jpg?t=st=1742274344~exp=1742277944~hmac=404787f4869992de396914a878735413cecc2f20e21b122dcc8d40820e3eb498&w=1380",
  "https://img.freepik.com/free-photo/white-sideboard-living-room-interior-with-copy-space_43614-800.jpg?t=st=1742274516~exp=1742278116~hmac=2a7c3ac42856943ec06117f24c9af5952878ea737a9d366d3db992e2d72c571d&w=1380",
  "https://img.freepik.com/free-photo/view-room-interior-with-furniture-copy-space_23-2150680550.jpg?t=st=1742274558~exp=1742278158~hmac=93234ba1c97975ed6bf5e314643f2badbb3ffec974e8f8218459bcfab56f27ef&w=1060",
  "https://img.freepik.com/free-photo/wood-sideboard-green-living-room-with-copy-space_43614-916.jpg?t=st=1742274585~exp=1742278185~hmac=43794b2b58a7baa940a6f854abc9fc97287097b8814e089183c005d6aa2267a6&w=1380",
];

const WorkGallery = ({
  autoplay = true,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

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
  const faceCount = images.length;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

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

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover
                           transition-transform duration-300 ease-out group-hover:scale-105
                           sm:h-[100px] sm:w-[220px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

WorkGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  autoplay: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

export default WorkGallery;
