import Lenis from "lenis";
import Mainpage from "./Pages/Mainpage";
import { BrowserRouter, Route, Routes } from "react-router";
import Painting from "./Pages/Painting";
import FuzzyText from "./Pages/FuzzyText";
import Makeup from "./Pages/Makeup";
import Grooming from "./Pages/Grooming";
import Repairing from "./Pages/Repairing";
import Cleaning from "./Pages/Cleaning";
import Handymen from "./Pages/Handymen";
import Booking from "./Pages/Booking";
import ProtectedRoute from "./Components/ProtectedRoute";

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
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/repairing" element={<Repairing />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/handymen" element={<Handymen />} />

          {/* Protected Booking Route */}
          <Route
            path="/book/:service"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="flex h-screen w-screen items-center justify-center">
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
