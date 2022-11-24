import { Track } from "./track";

export type PlayerState = {
  active: null | Track;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
};

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
}

type PlayAction = {
  type: PlayerActionTypes.PLAY;
};

type PauseAction = {
  type: PlayerActionTypes.PAUSE;
};

type SetActiveAction = {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: Track;
};

type SetDurationAction = {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
};

type SetCurrentTimeAction = {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
};

type SetVolumeAction = {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
};

export type PlayerAction =
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetCurrentTimeAction
  | SetVolumeAction;
