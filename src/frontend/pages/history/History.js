import { useEffect } from "react";
import { getHistory, deleteAllHistory } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { Navbar, NoVideo, VideoCard } from "../../components/index";
import style from "./history.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export function History() {
  const { dataState, dataDispatch } = useData();
  const { historyData } = dataState;
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getHistory(dataDispatch, authDispatch, axiosPrivate);
  }, []);

  return (
    <div>
      <Navbar />
      {historyData?.length > 0 ? (
        <div className={style.main}>
          <div className={style.videos}>
            {historyData.map((video) => (
              <VideoCard videoDetail={video} key={video._id} />
            ))}
          </div>
          <p
            className={style.clearHistory}
            onClick={() => deleteAllHistory(dataDispatch, axiosPrivate)}
          >
            Clear History
          </p>
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
