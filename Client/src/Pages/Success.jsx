import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return <div>Payment Done Successfully! Redirecting to Home Page...</div>;
};

export default Success;
