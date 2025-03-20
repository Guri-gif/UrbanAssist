import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const CustomButton = () => {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
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
