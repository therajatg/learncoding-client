import { useData, useAuth } from "../../contexts/index";
import { MdClose } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import {
  addNewPlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  deletePlaylist,
} from "../../apiCalls/index";
import style from "./playlistModal.module.css";
import { useState } from "react";

export function PlaylistModal({ setModal, videoDetail }) {
  const [showNameField, setShowNameField] = useState(false);
  const [name, setName] = useState("");

  const {
    authState: { token },
  } = useAuth();
  const { dataState, dataDispatch } = useData();
  const { playlistData } = dataState;

  return (
    <div className={style.main} onClick={() => setModal(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.topLineAndPlaylistNames}>
          <div className={style.topLine}>
            Save to...
            <MdClose
              onClick={() => setModal((prev) => !prev)}
              className={style.close}
            />
          </div>
          <div>
            {playlistData.map((playlist) => (
              <li className={style.nameList} key={playlist._id}>
                <div>
                  <input
                    type="checkbox"
                    checked={playlist.videos.find(
                      (video) => video._id === videoDetail._id
                    )}
                    onChange={(e) =>
                      e.target.checked
                        ? addVideoToPlaylist(
                            playlist._id,
                            videoDetail,
                            token,
                            dataDispatch
                          )
                        : deleteVideoFromPlaylist(
                            playlist._id,
                            videoDetail._id,
                            token,
                            dataDispatch
                          )
                    }
                  />
                  <label htmlFor="_id">{playlist.title}</label>
                </div>

                <AiFillDelete
                  className={style.deleteIcon}
                  onClick={() =>
                    deletePlaylist(playlist._id, token, dataDispatch)
                  }
                />
              </li>
            ))}
          </div>
        </div>
        {!showNameField && (
          <div
            onClick={() => {
              setShowNameField((prev) => !prev);
            }}
            className={style.createNew}
          >
            + Create New Playlist
          </div>
        )}
        {showNameField && (
          <div className={style.nameAndBtn}>
            <input
              type="text"
              placeholder="Enter Playlist Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={style.inputField}
            />
            <br />
            <button
              className={style.createPlaylistBtn}
              onClick={() => {
                addNewPlaylist(name, token, dataDispatch);
                setName("");
              }}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
