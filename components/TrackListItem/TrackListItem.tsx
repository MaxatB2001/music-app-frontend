import { Card } from '@mui/material'
import React from 'react'
import { useActions } from '../../hooks/useActions'
import { Track } from '../../types/track'
import { API_BASE_URL } from '../../utils/consts'
import styles from './TrackListItem.module.css'

type TrackListItemProps = {
  track: Track,
  index: number,
  active?: boolean,
}

const TrackListItem: React.FC<TrackListItemProps> = ({track, index, active = false}) => {

  const {playTrack, pauseTrack, setActiveTrack} = useActions();

  const play = () => {
    setActiveTrack(track);
    playTrack();
  }

  return (
    <div className={styles.track}>
      <div className={styles.left}>
        <span className={styles.index}>{index + 1}</span>
        <img onClick={play} className={styles.picture} src={`${API_BASE_URL}/${track.picture}`}/>
      </div>
      <div className={styles.right}>
        <div className={styles.rightLeft}>
          <div className={styles.name}>{track.name}</div>
          <div className={styles.artist}>{track.artist}</div>
        </div>
        <div className={styles.rightRight}>
          <div className={styles.duration}>2:57</div>
        </div>
      </div>
    </div>
  )
}

export default TrackListItem