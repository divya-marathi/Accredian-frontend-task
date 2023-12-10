import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [isLogged, setIslogged] = useState(true);

  useEffect(() => {
    if (token) {
      setIslogged(true);
    } else {
      setIslogged(false);
    }
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <section className=" ">
        <nav className="navbar navbar-light bg-danger flex justify-end flex-row-reverse text-end px-5 ">
          {isLogged ? (
            <Link to="/" onClick={logout}>
              <button className="navbar-item btn btn-outline-success bg-white  ">
                Logout
              </button>
            </Link>
          ) : (
            <Link
              to="/signup"
              className="navbar-item btn btn-outline-success bg-white "
            >
              Sign Up
            </Link>
          )}
        </nav>
        <Outlet />
      </section>
    </>
  );
}

export default Header;
