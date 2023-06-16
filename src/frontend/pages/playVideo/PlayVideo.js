import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar, RelatedVideos, PlaylistModal } from "../../components/index";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useAuth, useData } from "../../contexts/index";
import {
  addToLiked,
  deleteFromLiked,
  addToWatchLater,
  deleteFromWatchLater,
} from "../../apiCalls/index";
import style from "./PlayVideo.module.css";
import axios from "axios";

export function PlayVideo() {
  const location = useLocation();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { likedData, watchLaterData } = dataState;
  const { videoId } = useParams();
  const [clickedVideo, setClickedVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:5000/api/videos/${videoId}`
      );
      setClickedVideo(res.data.selectedVideo);
      setRelatedVideos(res.data.relatedVideos);
    })();
  }, []);

  const isPresentInWatchLater = watchLaterData.find(
    (video) => video._id === clickedVideo._id
  );

  const isPresentInLiked = likedData.find(
    (video) => video._id === clickedVideo._id
  );

  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div className={style.playingVideo}>
          <div className={style.videoContainer}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>

          <div>
            <p className={style.videoTitle}>{clickedVideo.title}</p>
            <h2 className={style.actions}>
              {isPresentInLiked ? (
                <button
                  className={style.actionBtn}
                  onClick={() =>
                    deleteFromLiked(clickedVideo._id, token, dataDispatch)
                  }
                >
                  <AiFillLike />
                  Liked
                </button>
              ) : (
                <button
                  className={style.actionBtn}
                  onClick={() => {
                    token
                      ? addToLiked(clickedVideo, token, dataDispatch)
                      : navigate("/login", { state: { from: location } });
                  }}
                >
                  <AiFillLike />
                  Like
                </button>
              )}
              {isPresentInWatchLater ? (
                <button
                  className={style.actionBtn}
                  onClick={() =>
                    deleteFromWatchLater(clickedVideo._id, token, dataDispatch)
                  }
                >
                  <IoIosCheckmarkCircle />
                  Watch Later
                </button>
              ) : (
                <button
                  className={style.actionBtn}
                  onClick={() => {
                    token
                      ? addToWatchLater(clickedVideo, token, dataDispatch)
                      : navigate("/login", { state: { from: location } });
                  }}
                >
                  <BsFillStopwatchFill />
                  Watch Later
                </button>
              )}
              <button
                className={style.actionBtn}
                onClick={(e) => {
                  token
                    ? setModal((prev) => !prev)
                    : navigate("/login", { state: { from: location } });
                }}
              >
                <MdPlaylistAdd />
                Add To Playlist
              </button>
            </h2>
          </div>
        </div>
        <RelatedVideos relatedVideos={relatedVideos} />
        {modal ? (
          <PlaylistModal setModal={setModal} videoDetail={clickedVideo} />
        ) : null}
      </main>
    </>
  );
}
