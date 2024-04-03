import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 my-3 shadow-lg sticky">
      <nav className="flex items-center justify-around font-bold">
        <div>
          <Link to={"/"}>Uttkarsh Kesharwani</Link>
        </div>
        <div>
          <ul className="flex">
            <li className="mx-1">
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="mx-1">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="mx-1">
              <Link to={"/contact_us"}>ContactUs</Link>
            </li>
            <li className="mx-1">
              <Link to={"/services"}>Services</Link>
            </li>
            <li className="mx-1">
              <Link to={"/login"}>Login</Link>
            </li>
            <li className="mx-1">
              <Link to={"/signup"}>SignUp</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
