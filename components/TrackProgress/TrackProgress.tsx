import React from "react";
import styles from './TrackProgress.module.css'

type TrackProgressProps = {
  left: number;
  right: number;
  onChange: (e: any) => void;
};

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
    <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            min={0}
            max={right}
            value={left}
            onChange={onChange}
          />
          </div>
  );
};

export default TrackProgress;
