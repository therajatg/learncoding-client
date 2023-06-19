import { toast } from "react-toastify";
import axios from "../axios";

async function signupHandler(e, detail, navigate, authDispatch) {
  e.preventDefault();
  try {
    const res = await axios.post("/api/auth/signup", detail, {
      withCredentials: true,
    });
    authDispatch({
      type: "FIRST_NAME",
      payload: res.data?.firstName,
    });
    authDispatch({
      type: "ACCESS_TOKEN",
      payload: res.data?.accessToken,
    });
    toast.success("Registration Successful");
    navigate("/");
  } catch (error) {
    if (error.response.status === 400) {
      toast.error(
        `${error.response.status} Error. ${error.response.data.message}`
      );
    } else {
      toast.error(`${error.response.status} Error. Please try again!`);
    }
  }
}

async function loginHandler(e, detail, navigate, authDispatch) {
  e.preventDefault();
  try {
    const res = await axios.post("/api/auth/login", detail, {
      withCredentials: true,
    });
    authDispatch({
      type: "FIRST_NAME",
      payload: res.data?.firstName,
    });
    authDispatch({
      type: "ACCESS_TOKEN",
      payload: res.data?.accessToken,
    });
    toast.success("Login Successful");
    navigate("/");
  } catch (error) {
    if (error.response.status === 400) {
      toast.error(
        `${error.response.status} Error. ${error.response.data.message}`
      );
    } else {
      toast.error(`${error.response.status} Error. Please try again!`);
    }
  }
}

const logoutHandler = async (authDispatch, navigate) => {
  try {
    const res = await axios.post("/api/auth/logout", {
      withCredentials: true,
    });
    authDispatch({
      type: "FIRST_NAME",
      payload: null,
    });
    authDispatch({
      type: "ACCESS_TOKEN",
      payload: null,
    });
    toast.success("Logout Successful");
    navigate("/");
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

export { signupHandler, loginHandler, logoutHandler };
