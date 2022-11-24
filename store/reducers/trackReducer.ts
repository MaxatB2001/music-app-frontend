import { TrackAction, TrackActionTypes } from './../../types/track';
import { TrackState } from "../../types/track"

const initState: TrackState = {
  tracks: [],
  error: ''
}

export const trackReducer = (state = initState, action: TrackAction): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return {...state, error: '', tracks: action.payload}
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return {...state, error: action.payload}
    default:
      return state;
  }
}