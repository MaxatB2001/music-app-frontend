export type Track = {
  _id: string;
  picture: string;
  artist: Artist;
  name: string;
  audio: string;
  listens: number;
};

export type Album = {
  _id: string;
  picture: string;
  tracks: Array<Track>;
  artist: Artist;
  name: string;
}

export type Artist = {
  _id: string;
  picture: string;
  name: string;
  tracks: Array<Track>;
  albums: Array<Album>;
};

export type TrackState = {
  tracks: Array<Track>;
  error: string;
};

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  SEARCH_TRACKS = "SEARCH_TRACKS"
}

type FetchTracksAction = {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: Array<Track>;
};

type FetchTracksErrorAction = {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
};

export type TrackAction = FetchTracksAction | FetchTracksErrorAction
