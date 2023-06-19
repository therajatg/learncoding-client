import axios from "axios";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const getHistory = async (dataDispatch, authDispatch, axiosPrivate) => {
  try {
    const res = await axiosPrivate.get("/api/user/history");
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (error) {
    if (error.response.status === 403) {
      authDispatch({ type: "ACCESS_TOKEN", payload: null });
    }
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const addToHistory = async (id, axiosPrivate) => {
  try {
    const res = await axiosPrivate.post("/api/user/history", {
      videoId: id,
    });
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const deleteAllHistory = async (dataDispatch, axiosPrivate) => {
  try {
    const res = await axiosPrivate.delete("/api/user/history/all");
    toast.success(res.data.message);
    dataDispatch({ type: "HISTORY", payload: [] });
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

const deleteItemFromHistory = async (id, dataDispatch, axiosPrivate) => {
  try {
    const res = await axiosPrivate.delete(`/api/user/history/${id}`);
    dataDispatch({ type: "HISTORY", payload: res.data.history });
    toast.success("Video successfully deleted");
  } catch (error) {
    toast.error(
      `${error.response.status} Error. ${error.response.data.message}`
    );
  }
};

export { getHistory, addToHistory, deleteItemFromHistory, deleteAllHistory };
