import { IconButton } from "@mui/material";
import styles from "./Player.module.css";
import React, { useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import AddIcon from "@mui/icons-material/Add";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TrackProgress from "../TrackProgress/TrackProgress";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { API_BASE_URL } from "../../utils/consts";

let audio: any;

const Player = () => {
  const { pause, volume, duration, active, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const { pauseTrack, playTrack, setCurrentTime, setDuration, setActiveTrack } =
    useActions();

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const calculateTime = (sec: any) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `${API_BASE_URL}/${active.audio}`;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  }

  if (!active) return null;

  return (
    <div className={styles.player}>
      <div className={styles.left}>
        <IconButton>
          <SkipPreviousIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
        <IconButton onClick={play}>
          {pause ? (
            <PlayArrowIcon style={{ color: "#797978", fontSize: "28px" }} />
          ) : (
            <PauseIcon style={{ color: "#797978", fontSize: "28px" }} />
          )}
        </IconButton>
        <IconButton>
          <SkipNextIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
        <IconButton>
          <FormatListBulletedIcon
            style={{ color: "#797978", fontSize: "28px" }}
          />
        </IconButton>
        <img
          className={styles.picture}
          src={`${API_BASE_URL}/${active?.picture}`}
        />
        <div className={styles.title}>
          <div className={styles.name}>{active?.name}</div>
          <div className={styles.artist}>{active?.artist}</div>
        </div>
        <IconButton>
          <FavoriteBorderIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
        <IconButton>
          <AddIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
      </div>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <span
        style={{ color: "white", fontSize: "12px", paddingLeft: "10px" }}
      >{`${calculateTime(currentTime)}/${calculateTime(duration)}`}</span>
      <div className={styles.right}>
        <IconButton>
          <ShuffleIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
        <IconButton>
          <RepeatIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
        <IconButton>
          <VolumeUpIcon style={{ color: "#797978", fontSize: "28px" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Player;
