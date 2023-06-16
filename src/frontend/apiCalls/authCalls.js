import axios from "axios";
import { toast } from "react-toastify";

async function signupHandler(e, detail, navigate) {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      detail
    );
    toast.success(res.data.message);
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
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      detail
    );
    // authDispatch({ type: "TOKEN" });
    toast.success(res.data.message);
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
    const res = await axios.post("http://localhost:5000/api/auth/logout");
    authDispatch({ type: "TOKEN", payload: null });
    toast.success("Logout Successful");
    navigate("/");
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

export { signupHandler, loginHandler, logoutHandler };
