import Particles from "./Particles";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        className="w-auto mx-[100px] my-10 shadow-2xl rounded-2xl overflow-hidden flex justify-evenly items-center relative"
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
        <div className="absolute w-[250px] h-[250px] left-[10%] top-1/2 transform -translate-y-1/2 bg-white/20 rounded-xl">
          <div className="w-full h-full flex flex-col justify-evenly">
            <img
              className="w-[80px] h-[80px] rounded-lg"
              src="src/assets/logo.png"
              alt=""
            />
            <p className="text-black text-sm text-left">
              UrbanAssist – Bridging the gap between customers and trusted local
              service providers with ease, reliability, and a commitment to
              empowering communities. Your city, your needs, our assistance –
              anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Center Block */}
        <div className="absolute w-[250px] h-[250px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-xl">
          <div className="w-full h-full flex flex-col justify-evenly">
            <h1 className="text-lg">Office 🏢</h1>
            <div>
              <p className="text-sm">
                7890 Walnut Blvd <br />
                Sterling Heights <br />
                MI 48310 <br />
                USA
              </p>
            </div>
            <a href="mailto:astarxxx676@gmail.com" className="underline">
              astarxxx676@gmail.com
            </a>
            <p>+1 (313) 555-7890</p>
          </div>
        </div>

        {/* Right Block */}
        <div className="absolute w-[250px] h-[250px] right-[10%] top-1/2 transform -translate-y-1/2 bg-white/20 rounded-xl">
          <div className="w-full h-full flex flex-col justify-evenly">
            <h1 className="text-lg">Links</h1>
            <ul className="text-sm flex flex-col gap-2">
              <a href="mailto:astarxxx676@gmail.com">
                {" "}
                <li>Contact</li>
              </a>
              <li>About Us</li>
              <NavLink to={"/"}>
                <li>Home</li>
              </NavLink>

              <li></li>
            </ul>
            <div className="flex items-center gap-4 h-auto">
                  <img className="w-[32px] h-[32px]" src="src/assets/mail.png" alt="" />
                  <img className="w-[30px] h-[30px]" src="src/assets/fb.png" alt="" />
                  <img className="w-[30px] h-[30px]" src="src/assets/x.png" alt="" />
            </div>
          </div>
        </div>
        <p className="absolute bottom-5 left-130">
          Gursewak Singh © 2025- All Right Reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;
