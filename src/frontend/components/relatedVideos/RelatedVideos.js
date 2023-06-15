import style from "./relatedVideos.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth, useData } from "../../contexts/index";
import { deleteItemFromHistory, addToHistory } from "../../apiCalls/index";
import axios from "axios";

export function RelatedVideos({ relatedVideos }) {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { likedData, watchLaterData, historyData } = dataState;
  const [modal, setModal] = useState(false);

  return (
    <div className={style.relatedVideos}>
      {relatedVideos.map((relatedVideo) => (
        <Link
          to={`/tutorial/${relatedVideo._id}`}
          className={style.thumbnail}
          key={relatedVideo._id}
          onClick={() => {
            //If video already present in history, I'll update the time else will add a new row (with latest time by default)
            if (token) {
              if (historyData.find((video) => video._id === relatedVideo._id)) {
                deleteItemFromHistory(relatedVideo._id, token, dataDispatch);
                addToHistory(relatedVideo, token, dataDispatch);
              } else {
                addToHistory(relatedVideo, token, dataDispatch);
              }
            }
          }}
        >
          <img
            src={relatedVideo.thumbnail}
            alt="Thumbnail"
            className={style.thumbnailVideo}
          />
          <p className={style.thumbnailText}>{relatedVideo.title}</p>
        </Link>
      ))}
    </div>
  );
}
