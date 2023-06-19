import { useEffect } from "react";
import { getWatchLater } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { Navbar, NoVideo } from "../../components/index";
import { VideoCard } from "../../components/videoCard/VideoCard";
import style from "./watchLater.module.css";

export function WatchLater() {
  const { dataState, dataDispatch } = useData();
  const { watchLaterData } = dataState;

  useEffect(() => {
    getWatchLater(dataDispatch);
  }, []);

  return (
    <div>
      <Navbar />
      {watchLaterData?.length > 0 ? (
        <div className={style.main}>
          {watchLaterData.map((video) => (
            <VideoCard videoDetail={video} key={video._id} />
          ))}
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
