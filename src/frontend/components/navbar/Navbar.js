import style from "./navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose, AiFillHome, AiFillLike } from "react-icons/ai";
import { BsFillPlayFill, BsFillFilePlayFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";
import { MdWatchLater } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgPlayList } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useData } from "../../contexts/index";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export function Navbar() {
  const [categories, setCategories] = useState([]);
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();
  const [menu, setMenu] = useState(false);
  const [hamburgerCategory, setHamburgerCategory] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const res1 = await axios.get("http://localhost:5000/api/categories");
      setCategories(res1.data.categories);
    })();
  }, []);

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    authDispatch({ type: "TOKEN", payload: null });
    Cookies.remove("jwt");
    toast.success("Logout Successful");
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.topLine}>
        <p className={style.hamburger} onClick={() => setMenu((prev) => !prev)}>
          <GiHamburgerMenu />
        </p>
        {menu && (
          <ul className={style.hamburgerMenu}>
            <li>
              <AiFillHome />
              <Link to="/" onClick={() => dataDispatch({ type: "RESET" })}>
                Home
              </Link>
            </li>
            <li>
              <BiHistory />
              <Link to="/history">History</Link>
            </li>
            <li>
              <AiFillLike />
              <Link to="/liked">Liked</Link>
            </li>
            <li>
              <MdWatchLater />
              <Link to="/watchLater">Watch Later</Link>
            </li>
            <li>
              <CgPlayList />
              <Link to="/playlist">Playlist</Link>
            </li>
            <li onClick={() => setHamburgerCategory((prev) => !prev)}>
              {!hamburgerCategory && <BsFillPlayFill />}
              {hamburgerCategory && <IoMdArrowDropdown />}
              <p>Categories</p>
            </li>
            {hamburgerCategory &&
              categories?.map((category) => (
                <li
                  value={category.categoryName}
                  onClick={(e) => {
                    navigate("/");
                    e.target.innerText &&
                      dataDispatch({
                        type: "CATEGORY",
                        payload: e.target.innerText,
                      });
                  }}
                  key={category._id}
                >
                  <BsFillFilePlayFill />
                  <p>{category.categoryName}</p>
                </li>
              ))}
          </ul>
        )}
        <Link to="/" className={style.logo}>
          <p onClick={() => dataDispatch({ type: "RESET" })}>Code2BUILD</p>
        </Link>
        <Link
          to="/"
          className={style.option}
          onClick={() => dataDispatch({ type: "RESET" })}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`${style.option} ${
            pathname === "/history" && style.active
          }`}
        >
          History
        </Link>
        <Link
          to="/liked"
          className={`${style.option} ${pathname === "/liked" && style.active}`}
        >
          Liked
        </Link>
        <Link
          to="/watchLater"
          className={`${style.option} ${
            pathname === "/watchLater" && style.active
          }`}
        >
          Watch Later
        </Link>
        <Link
          to="/playlist"
          className={`${style.option} ${
            pathname === "/playlist" && style.active
          }`}
        >
          Playlist
        </Link>
        <Link to="/" className={`${style.option} ${style.dropdown}`}>
          Categories <IoMdArrowDropdown />
          <div className={style.dropdownContent}>
            {console.log("categories", categories)}
            {categories?.map((category) => (
              <option
                value={category.categoryName}
                onClick={(e) =>
                  dataDispatch({
                    type: "CATEGORY",
                    payload: e.target.value,
                  })
                }
                key={category._id}
              >
                {category.categoryName}
              </option>
            ))}
          </div>
        </Link>
      </div>

      <div className={style.bottomLine}>
        <div className={style.searchBar}>
          <input
            placeholder="Search Video"
            className={style.searchInput}
            onChange={(e) => {
              dataDispatch({
                type: "SEARCH",
                payload: e.target.value,
              });
            }}
          />
          <AiOutlineSearch className={style.searchIcon} />
        </div>
        {token && (
          <button onClick={logoutHandler} className={style.login}>
            Logout
          </button>
        )}
        {!token && (
          <button onClick={loginHandler} className={style.login}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
