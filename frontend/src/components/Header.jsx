import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="/">Goals</Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <FaSignInAlt /> Goals
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaSignInAlt /> Register
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
