import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">RecipeApp</div>

        <nav className="nav__links">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
          <NavLink to="/add" className="nav__link">
            Add Recipe
          </NavLink>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
