import { Grid, styled, TextField } from '@mui/material'
import React from 'react'

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: black;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #f2e161;
    }
  }
`;

const TrackInfoForm = () => {
  return (
    <Grid container direction='column' style={{padding:20}}>
      <WhiteBorderTextField
        style={{marginTop: 10}}
        label={"Название песни"}
      />
      <WhiteBorderTextField
        style={{marginTop: 10}}
        label={"Автор"}
      />
      <WhiteBorderTextField
        style={{marginTop: 10}}
        label={"текст песни"}
        multiline
        rows={3}
      />
    </Grid>
  )
}

export default TrackInfoForm