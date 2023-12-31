import axios from "axios";
import { toast } from "react-toastify";

const getWatchLater = async (dataDispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/user/watchlater");
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

const addToWatchLater = async (id, dataDispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/api/user/watchlater", {
      videoId: id,
    });
    toast.success("Video added to watch later");
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

const deleteFromWatchLater = async (id, dataDispatch) => {
  try {
    const res = await axios.delete(`/api/user/watchlater/${id}`);
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
    toast.success("Video removed from watch later");
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

export { getWatchLater, addToWatchLater, deleteFromWatchLater };
