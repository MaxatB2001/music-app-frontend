import { Box, Grid } from '@mui/material'
import React from 'react'
import { Track } from '../types/track'
import TrackListItem from './TrackListItem/TrackListItem'

type TrackListProps = {
  tracks: Array<Track>
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
  return (
    <Grid container direction='column'>
      <Box p={2}>
        {tracks.map((track, index) => <TrackListItem track={track} index={index} key={track._id}/>)}
      </Box>
    </Grid>
  )
}

export default TrackList