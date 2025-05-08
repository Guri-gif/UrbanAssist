import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomButton = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    console.log("Google Auth Response:", authResult);
    try {
      if (authResult.code) {
        const res = await axios.post(
          `http://localhost:5000/api/auth/google?code=${authResult.code}`
        );
        console.log("Response from backend:", res);
        const { email, name, image } = res.data.user;
        const token = res.data.token;
        const obj = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(obj));

        navigate("/"); 
      } else {
        throw new Error("Google authentication failed");
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
      onClick={login}
      className="bg-black text-white w-[300px] px-4 py-2 rounded-lg hover:scale-[1.04] duration-700 cursor-pointer flex justify-evenly items-center"
    >
      <p>Sign In using Google</p>
      <FcGoogle />
    </div>
  );
};

export default CustomButton;
