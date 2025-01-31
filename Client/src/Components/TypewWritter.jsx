import Typewriter from "typewriter-effect";

const TypewWritter = () => {
  return (
    <div className="font-bold text-gray-500 ml-16">
      <Typewriter
        options={{
          strings: [`Smart`, "Local", "Fast", "Reliable."],
          autoStart: true,
          loop: true,
          delay: 250,
          deleteSpeed: 100, 
          cursor: "", 
          pauseFor: 700,
          startDelay: 500,
        }}
      />
    </div>
  );
};

export default TypewWritter;
