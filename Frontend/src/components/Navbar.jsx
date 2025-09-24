import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const navigate = useNavigate();

  // Dark mode toggle
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // Sticky navbar
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/course?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/course");
    }
  };

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a>Contact</a></li>
      <li><a>About</a></li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 dark:bg-slate-800 dark:text-white ${
        sticky ? "shadow-md bg-base-200 dark:bg-slate-700 transition-all" : ""
      }`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <a className="text-2xl font-bold cursor-pointer">bookStore</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end space-x-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <label className="px-3 py-2 border rounded-md flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                placeholder="Search"
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>

          {/* Dark mode toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="synthwave" />
            {/* sun */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <path d="M5.64,17l-.71.71a1,1..." />
            </svg>
            {/* moon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <path d="M21.64,13a1,1,0,0,0..." />
            </svg>
          </label>

          {authUser ? (
            <Logout />
          ) : (
            <div>
              <a
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </a>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
