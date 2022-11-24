import React from 'react'
import TrackList from '../../components/TrackList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracks } from '../../store/action-creators/track'

const Tracks = () => {
  const {tracks, error} = useTypedSelector(state => state.track)

  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  } 

  return (
    <MainLayout>
      <TrackList tracks={tracks}/>
    </MainLayout>
  )
}

export default Tracks

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () =>
  {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(fetchTracks());

      return { props: {} }
  }
);