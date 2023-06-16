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

  console.log("related", relatedVideos);
  return (
    <div className={style.relatedVideos}>
      {relatedVideos.map((relatedVideo) => (
        <Link
          to={`/tutorial/${relatedVideo._id}`}
          className={style.thumbnail}
          key={relatedVideo._id}
          onClick={() => {
            if (token) {
              addToHistory(relatedVideo._id);
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
