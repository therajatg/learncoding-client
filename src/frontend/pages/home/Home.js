import { Navbar, HeroContent, VideoCard } from "../../components/index";
import { useData } from "../../contexts/index";
import style from "./home.module.css";
import axios from "axios";

export function Home() {
  const { dataState } = useData();
  const { filteredData } = dataState;

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
