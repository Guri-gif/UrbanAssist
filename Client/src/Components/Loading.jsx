import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <DotLottieReact
        src="https://lottie.host/b161e727-450a-4b33-b0e8-17afd6fe5faf/YYXJvWOLIi.lottie"
        loop
        autoplay
        className="w-fit h-fit"
      />
    </div>
  );
};

export default Loading;
