import { useEffect, useRef } from "react";
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
  static useMouseWheelNavigation = (
    targetRouteUp: string,
    targetRouteDown: string,
    debounceTime: number = 300,
    delayTime: number = 100
  ) => {
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);
    const lastScrollTime = useRef<number | null>(null);
  
    const handleMouseWheel = (event: WheelEvent) => {
      const now = Date.now();
      if (!lastScrollTime.current || now - lastScrollTime.current > delayTime) {
        clearTimeout(timeoutRef.current!);
        timeoutRef.current = window.setTimeout(() => {
          navigate(event.deltaY > 0 ? targetRouteDown : targetRouteUp);
        }, debounceTime);
      }
      lastScrollTime.current = now;
    };
  
    useEffect(() => {
      window.addEventListener('wheel', handleMouseWheel);
      return () => {
        window.removeEventListener('wheel', handleMouseWheel);
        clearTimeout(timeoutRef.current!);
      };
    }, [targetRouteUp, debounceTime, delayTime]);
  
    return navigate;
  };

  static useTouchNavigation = (
    targetRouteUp: string,
    targetRouteDown: string
  ) => {
    const navigate = useNavigate();

    let startY: number | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!startY) return;

      const endY = event.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (deltaY > 0) {
        navigate(targetRouteDown);
      } else if (deltaY < 0) {
        navigate(targetRouteUp);
      }

      // Reset startY for next touch event
      startY = null;
    };

    useEffect(() => {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }, [targetRouteUp, targetRouteDown]);

    // Optionally return the navigate function if needed
    return navigate;
  };
}
