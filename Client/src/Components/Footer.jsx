import Particles from "./Particles";

const Footer = () => {
  return (
    <>
      <div
        className="w-auto mx-[100px] my-10 shadow-2xl rounded-2xl overflow-hidden flex justify-between items-center relative"
        style={{ height: "400px" }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        {/* Left Block */}
        <div className="absolute w-[150px] h-[150px] left-[10%] top-1/2 transform -translate-y-1/2 bg-white/20 rounded-xl"></div>

        {/* Center Block */}
        <div className="absolute w-[150px] h-[150px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-xl"></div>

        {/* Right Block */}
        <div className="absolute w-[150px] h-[150px] right-[10%] top-1/2 transform -translate-y-1/2 bg-white/20 rounded-xl"></div>
      </div>
    </>
  );
};

export default Footer;
