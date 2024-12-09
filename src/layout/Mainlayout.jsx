import { Link, NavLink } from "react-router-dom";
import "./index.css";
function Mainlayout({ children }) {
  return (
    <div>
      <div className="header__top">
        <div className="container header__top-container">
          <div className="login-links">
            <Link>Sign in / Guest</Link>
            <Link>Create Account</Link>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container header__container">
          <Link className="site-link" to="/">
            C
          </Link>
          <nav className="sitenav">
            <ul className="sitenav__list">
              <li className="sitenav__item">
                <NavLink className="sitenav__link " to="/">
                  Home
                </NavLink>
              </li>
              <li className="sitenav__item">
                <NavLink className="sitenav__link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="sitenav__item">
                <NavLink className="sitenav__link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="sitenav__item">
                <NavLink className="sitenav__link" to="/cart">
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="theme_shop">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="swap-off h-7 w-7"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
            </svg>
            <div className="shop">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-9 w-9"
                height="1.3em"
                width="1.3em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
              <span className="shop-counter">0</span>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
export default Mainlayout;
