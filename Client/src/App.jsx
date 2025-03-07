import Lenis from "lenis";
import Mainpage from "./Pages/Mainpage";
import { BrowserRouter, Route, Routes } from "react-router";
import Painting from "./Pages/Painting";
import FuzzyText from "./Pages/FuzzyText";

function App() {
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/painting" element={<Painting />} />
          <Route
            path="*"
            element={
              <div className="flex h-screen items-center justify-center">
                <FuzzyText
                  baseIntensity={0.2}
                  hoverIntensity={1}
                  enableHover={true}
                >
                  404 - Page Not Found
                </FuzzyText>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
