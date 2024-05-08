import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default class userInputUtils {
  static useKeyboardNavigation = (
    targetRoute: string,
    targetKeys: string[]
  ) => {
    const navigate = useNavigate();

    const handleKeyPress = (event: KeyboardEvent) => {
      if (targetKeys.includes(event.key)) {
        navigate(targetRoute);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [targetRoute, targetKeys]);

    // Optionally return the navigate function if needed
    return navigate;
  };
  static useMouseWheelNavigation = (targetRoute: string) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState<number | null>(null);

    const handleMouseWheel = (event: WheelEvent) => {
      if (!timer) {
        setTimer(
          setTimeout(() => {
            navigate(targetRoute);

            setTimer(null);
          }, 300) // Adjust the delay time here (in milliseconds)
        );
      }
    };

    useEffect(() => {
      window.addEventListener("wheel", handleMouseWheel);
      return () => {
        window.removeEventListener("wheel", handleMouseWheel);
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [targetRoute, timer, navigate]);

    // Optionally return the navigate function if needed
    return navigate;
  };
}
