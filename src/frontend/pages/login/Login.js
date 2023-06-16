import style from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import { loginHandler } from "../../apiCalls";

export function Login() {
  const { authState, authDispatch } = useAuth();
  const [detail, setDetail] = useState({ email: "", password: "" });
  const location = useLocation();
  const navigate = useNavigate();

  // async function loginHandler(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/api/auth/login", detail);
  //     localStorage.setItem("token", res.data.encodedToken);
  //     authDispatch({ type: "TOKEN", payload: res.data.encodedToken });
  //     toast.success("Login Successful");
  //     let from = location.state?.from?.pathname || "/";
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     toast.error(`${err.response.status} Error. Please try again!`);
  //   }
  // }

  return (
    <div className={style.loginPage}>
      <form
        className={style.form}
        onSubmit={(e) => loginHandler(e, detail, navigate, authDispatch)}
      >
        <p className={style.title}>Login to code2BUILD</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={detail.email}
            onChange={(e) => setDetail({ ...detail, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={detail.password}
            onChange={(e) => setDetail({ ...detail, password: e.target.value })}
            required
          />
          <span>Forgot Password?</span>
        </div>
        <button className={style.loginBtn}>LOGIN</button>
        <button
          className={style.guestLoginBtn}
          onClick={() => {
            setDetail({
              email: "rajatgupta@gmail.com",
              password: "rajat123",
            });
          }}
        >
          Login As Guest
        </button>

        <p className={style.signupLine}>
          Need An Account?{" "}
          <Link to="/signup" className={style.signup}>
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
