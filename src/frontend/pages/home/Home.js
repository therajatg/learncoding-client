import { useEffect } from "react";
import { Navbar, HeroContent, VideoCard } from "../../components/index";
import { useData } from "../../contexts/index";
import style from "./home.module.css";
import axios from "axios";

export function Home() {
  const { dataState, dataDispatch } = useData();
  const { filteredData } = dataState;

  // useEffect(() => {
  //   (async () => {
  //     const res2 = await axios.get("http://localhost:5000/api/user/watchLater"});
  //     dataDispatch({ type: "WATCH_LATER", payload: res2?.data?.watchlater });
  //   })();
  // }, []);

  return (
    <div className={style.home}>
      <Navbar className={style.navbar} />
      <HeroContent className={style.HeroContent} />
      <main className={style.mainContainer}>
        {filteredData?.map((videoDetail) => (
          <VideoCard videoDetail={videoDetail} key={videoDetail._id} />
        ))}
      </main>
    </div>
  );
}
