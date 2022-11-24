import React from 'react'
import ResponsiveAppBar from '../components/NavBar'
import Container from '@mui/material/Container';
import Player from '../components/player/Player';
import { Grid } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<Props> = ({children}) => {
  return (
      <Container maxWidth="xl">
      <ResponsiveAppBar/>
      <Grid container style={{backgroundColor: "#181818", height: '100vh'}}>
      <Grid item container xs={8}>
        {children}
      </Grid>
      <Grid item container xs={4} style={{borderLeft: "1px solid #242424"}} justifyContent='center'>
        s
      </Grid>
      </Grid>
        <Player/>
      </Container>
  )
}

export default MainLayout