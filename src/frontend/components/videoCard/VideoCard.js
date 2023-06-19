import style from "./videoCard.module.css";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useData } from "../../contexts/dataContext";
import {
  addToWatchLater,
  deleteFromWatchLater,
  addToLiked,
  deleteFromLiked,
  addToHistory,
  deleteItemFromHistory,
  deleteVideoFromPlaylist,
} from "../../apiCalls/index";

import { useAuth } from "../../contexts/authContext";
import { PlaylistModal } from "../index";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export function VideoCard({ videoDetail }) {
  const { playlistId } = useParams();
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { watchLaterData, likedData, historyData } = dataState;
  const { thumbnail, _id } = videoDetail;
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const axiosPrivate = useAxiosPrivate();

  return (
    <div className={modal ? style.videoCardWithoutHover : style.videoCard}>
      <Link to={`/tutorial/${_id}`} className={style.thumbnail}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          onClick={() => {
            if (token) {
              addToHistory(_id, axiosPrivate);
            }
          }}
        />
      </Link>
      <div className={style.videoAction}>
        {console.log(watchLaterData, _id)}
        {token ? (
          watchLaterData?.find((video) => video.video_id == _id) ? (
            <button
              className={style.watchLater}
              onClick={() => deleteFromWatchLater(_id, dataDispatch)}
            >
              <BsFillStopwatchFill />
              Remove From Watch Later
            </button>
          ) : (
            <button
              className={style.watchLater}
              onClick={() => addToWatchLater(_id, dataDispatch)}
            >
              <BsFillStopwatchFill />
              Watch Later
            </button>
          )
        ) : (
          <button
            className={style.watchLater}
            onClick={() => navigate("/login")}
          >
            <BsFillStopwatchFill />
            Watch Later
          </button>
        )}
        {token ? (
          likedData.find((video) => video._id === _id) ? (
            <button
              className={style.addToLiked}
              onClick={() => deleteFromLiked(_id, token, dataDispatch)}
            >
              <AiFillLike />
              Remove From Liked
            </button>
          ) : (
            <button
              className={style.addToLiked}
              onClick={() => addToLiked(videoDetail, token, dataDispatch)}
            >
              <AiFillLike />
              Add To Liked
            </button>
          )
        ) : (
          <button
            className={style.addToLiked}
            onClick={() => navigate("/login")}
          >
            <AiFillLike />
            Add To Liked
          </button>
        )}

        <button
          className={style.addToPlaylist}
          onClick={(e) => {
            token ? setModal((prev) => !prev) : navigate("/login");
          }}
        >
          <MdPlaylistAdd />
          {pathname.split("/")[1] === `playlist`
            ? "Add To Another Playlist"
            : "Add To Playlist"}
        </button>

        {pathname === "/history" && (
          <button
            onClick={() =>
              deleteItemFromHistory(_id, dataDispatch, axiosPrivate)
            }
          >
            Remove From History
          </button>
        )}
        {pathname === `/playlist/${playlistId}` && (
          <button
            onClick={() =>
              deleteVideoFromPlaylist(
                playlistId,
                videoDetail._id,
                token,
                dataDispatch
              )
            }
          >
            Remove From This Playlist
          </button>
        )}
      </div>

      {modal ? (
        <PlaylistModal setModal={setModal} videoDetail={videoDetail} />
      ) : null}
    </div>
  );
}
