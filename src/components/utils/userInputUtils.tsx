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
  static useMouseWheelNavigation = (
    targetRouteUp: string,
    targetRouteDown: string
  ) => {
    const navigate = useNavigate();

    const handleMouseWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        navigate(targetRouteUp);
      } else if (event.deltaY > 0) {
        navigate(targetRouteDown);
      }
    };

    useEffect(() => {
      window.addEventListener("wheel", handleMouseWheel);
      return () => {
        window.removeEventListener("wheel", handleMouseWheel);
      };
    }, [targetRouteUp, targetRouteDown]);

    // Optionally return the navigate function if needed
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
