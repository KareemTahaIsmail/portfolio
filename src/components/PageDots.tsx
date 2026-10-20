import { Link, useLocation } from "react-router-dom";
import "./styles/PageDots.css";

// Same order as scroll/swipe navigation: scrolling down moves to the next dot
const PAGES = [
  { path: "/", label: "Home" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
];

const PageDots = () => {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/$/, "") || "/";

  return (
    <nav className="pageDots" aria-label="Pages">
      {PAGES.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={path === current ? "dot active" : "dot"}
          aria-label={label}
          aria-current={path === current ? "page" : undefined}
          title={label}
        />
      ))}
    </nav>
  );
};

export default PageDots;
