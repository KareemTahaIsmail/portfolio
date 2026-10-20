import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Minimum vertical swipe distance (px) before a touch counts as navigation
const SWIPE_THRESHOLD = 50;
// Ignore further wheel/swipe input for this long after navigating, so one
// trackpad flick (with its inertia) can't skip through multiple pages.
// Module-level so the cooldown carries over to the newly mounted page.
const NAVIGATION_COOLDOWN = 800;
let lastNavigationTime = 0;

const tryNavigate = (navigate: (route: string) => void, route: string) => {
  const now = Date.now();
  if (now - lastNavigationTime < NAVIGATION_COOLDOWN) return;
  lastNavigationTime = now;
  navigate(route);
};

export default class userInputUtils {
  static useKeyboardNavigation = (
    targetRoute: string,
    targetKeys: string[]
  ) => {
    const navigate = useNavigate();
    const keys = targetKeys.join("|");

    useEffect(() => {
      const keyList = keys.split("|");
      const handleKeyPress = (event: KeyboardEvent) => {
        if (keyList.includes(event.key)) {
          navigate(targetRoute);
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [navigate, targetRoute, keys]);

    return navigate;
  };

  static useMouseWheelNavigation = (
    targetRouteUp: string,
    targetRouteDown: string
  ) => {
    const navigate = useNavigate();

    useEffect(() => {
      const handleMouseWheel = (event: WheelEvent) => {
        if (event.deltaY === 0) return;
        tryNavigate(navigate, event.deltaY > 0 ? targetRouteDown : targetRouteUp);
      };

      window.addEventListener("wheel", handleMouseWheel);
      return () => {
        window.removeEventListener("wheel", handleMouseWheel);
      };
    }, [navigate, targetRouteUp, targetRouteDown]);

    return navigate;
  };

  static useTouchNavigation = (
    targetRouteUp: string,
    targetRouteDown: string
  ) => {
    const navigate = useNavigate();

    useEffect(() => {
      let startY: number | null = null;

      const handleTouchStart = (event: TouchEvent) => {
        startY = event.touches[0].clientY;
      };

      const handleTouchEnd = (event: TouchEvent) => {
        if (startY === null) return;

        const deltaY = startY - event.changedTouches[0].clientY;
        startY = null;

        if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
        tryNavigate(navigate, deltaY > 0 ? targetRouteDown : targetRouteUp);
      };

      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }, [navigate, targetRouteUp, targetRouteDown]);

    return navigate;
  };
}
