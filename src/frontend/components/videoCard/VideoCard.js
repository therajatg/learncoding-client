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

  return (
    <div className={modal ? style.videoCardWithoutHover : style.videoCard}>
      <Link to={`/tutorial/${_id}`} className={style.thumbnail}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          onClick={() => {
            if (token) {
              addToHistory(_id);
            }
          }}
        />
      </Link>
      <div className={style.videoAction}>
        {token ? (
          watchLaterData.find((video) => video._id === _id) ? (
            <button
              className={style.watchLater}
              onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}
            >
              <BsFillStopwatchFill />
              Remove From Watch Later
            </button>
          ) : (
            <button
              className={style.watchLater}
              onClick={() => addToWatchLater(_id)}
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
          <button onClick={() => deleteItemFromHistory(_id, dataDispatch)}>
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
