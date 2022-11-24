import { API_BASE_URL } from './../../utils/consts';
import { TrackActionTypes } from "./../../types/track";
import { Dispatch } from "react";
import { TrackAction } from "../../types/track";
import axios from "axios";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/track?count=100`);
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Ошибка при загрузге песен",
      });
    }
  };
};