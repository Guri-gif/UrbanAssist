import React from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

function FAQ({ items = [] }) {
  return (
    <div className="w-full h-full overflow-hidden p-6">
      <nav className="flex flex-col h-full m-0 p-0 space-y-6">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ question, answer }) {
  const itemRef = React.useRef(null);
  const answerRef = React.useRef(null);

  const animationDefaults = { duration: 0.4, ease: "power3.out" };

  const handleMouseEnter = () => {
    if (!answerRef.current) return;
    gsap.to(answerRef.current, {
      y: "0%",
      opacity: 1,
      ...animationDefaults,
    });
    gsap.to(itemRef.current, {
      scale: 1.015,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!answerRef.current) return;
    gsap.to(answerRef.current, {
      y: "100%",
      opacity: 0,
      ...animationDefaults,
    });
    gsap.to(itemRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
  };

  return (
    <div
      className="relative overflow-hidden text-center shadow-lg rounded-lg bg-black text-white transition-transform duration-300 ease-out hover:shadow-2xl p-4"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-lg font-semibold">{question}</div>
      <div
        ref={answerRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black text-lg bg-white opacity-0 translate-y-full transition-all duration-500 ease-out"
      >
        {answer}
      </div>
    </div>
  );
}

FAQ.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};

MenuItem.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

export default FAQ;
