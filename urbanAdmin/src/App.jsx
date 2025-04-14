import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Mainpage from "./Pages/Mainpage";
import Users from "./Pages/Users";
import Bookings from "./Pages/Bookings";
import Services from "./Pages/Services";
import AuthLogin from "./Components/authLogin";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/mainpage"
          element={
            <AuthLogin>
              <Mainpage />
            </AuthLogin>
          }
        >
          <Route index element={<Users />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
