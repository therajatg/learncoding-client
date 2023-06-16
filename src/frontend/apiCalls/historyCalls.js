import axios from "axios";
import { toast } from "react-toastify";

const getHistory = async (dataDispatch, authDispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/user/history");
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (error) {
    if (error.response.status === 401) {
      authDispatch({ type: "TOKEN", payload: null });
    }
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const addToHistory = async (id) => {
  try {
    const res = await axios.post("http://localhost:5000/api/user/history", {
      videoId: id,
    });
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const deleteItemFromHistory = async (id, token, dataDispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/user/history/${id}`
    );
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const deleteAllHistory = async (token, dataDispatch) => {
  try {
    const res = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (err) {
    console.log(err);
  }
};

export { getHistory, addToHistory, deleteItemFromHistory, deleteAllHistory };
