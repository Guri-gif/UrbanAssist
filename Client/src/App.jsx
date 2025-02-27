import Lenis from "lenis";
import Mainpage from "./Pages/Mainpage";
import { BrowserRouter, Route, Routes } from "react-router";
import Painting from "./Pages/Painting";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
