import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const INACTIVITY_LIMIT = 2 * 60 * 1000; 
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, []);
};

export default useAutoLogout;
