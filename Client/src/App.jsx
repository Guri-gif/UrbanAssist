import Navbar from "./Components/Navbar";
import Lenis from "lenis";

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
      <Navbar></Navbar>
    </>
  );
}

export default App;
