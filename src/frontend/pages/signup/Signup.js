import style from "./signup.module.css";
import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export function Signup() {
  const { authState, authDispatch } = useAuth();
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [dummy, setDummy] = useState(false);
  const navigate = useNavigate();

  async function signupHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        detail
      );
      console.log("res from signup", res.data);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        toast.error(
          `${error.response.status} Error. ${error.response.data.message}`
        );
      } else {
        toast.error(`${error.response.status} Error. Please try again!`);
      }
    }

    // try {
    //   let res;
    //   dummy === true
    //     ? (res = await axios.post("/api/auth/login", detail))
    //     : (res = await axios.post("/api/auth/signup", detail));
    //   localStorage.setItem("token", res.data.encodedToken);
    //   authDispatch({ type: "TOKEN", payload: res.data.encodedToken });
    //   toast.success("Signup Successful");
    //   navigate("/");
    // } catch (err) {
    //   toast.error(`${err.response.status} Error. Please try again!`);
    // }
  }

  return (
    <div className={style.signupPage}>
      <form className={style.form} onSubmit={signupHandler}>
        <p className={style.title}>Welcome to code2BUILD</p>

        <div className={style.name}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={detail.firstName}
              onChange={(e) =>
                setDetail({ ...detail, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={detail.lastName}
              onChange={(e) =>
                setDetail({ ...detail, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>
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
        </div>

        <button className={style.signupBtn}>Create New Account</button>
        <button
          className={style.demoSignupBtn}
          onClick={() => {
            {
              setDummy(true);

              setDetail({
                ...detail,
                firstName: "Dummy",
                lastName: "Bro",
                email: "rajatgupta@gmail.com",
                password: "rajat123",
              });
            }
          }}
        >
          Dummy Signup
        </button>
        <p className={style.loginLine}>
          Already have an account?{" "}
          <Link to="/login" className={style.login}>
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
