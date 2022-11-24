import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Card,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUploadForm from "../../components/forms/FileUploadForm";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import { Track } from "../../types/track";
import { API_BASE_URL } from "../../utils/consts";

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

const searchQuery = async (query: string) => {
  try {
    const responce = await fetch(`${API_BASE_URL}/track/search?query=${query}`);
    const data = await responce.json();
    return data;
  } catch (e) {
    throw e;
  }
};

const create = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const name = useInput("");
  const artist = useInput("");
  const query = useInput("");
  const [picture, setPicture] = useState(null);
  const [songs, setSongs] = useState<Array<Track>>([]);
  const [chosenSongs, setChosenSongs] = useState<Array<Track>>([]);

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      const ids = chosenSongs.map(song => song._id)
      
      formData.append("tracksIds", JSON.stringify(ids));
      if (picture != null) formData.append("file", picture);
      axios.post(`${API_BASE_URL}/album`, formData).then(data => console.log(data))
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    searchQuery(query.value)
      .then((data) => setSongs(data))
      .catch((er) => console.log("some"));
  }, [query.value]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid container justifyContent="center">
        <Button
          disabled={activeStep === 0}
          onClick={back}
          sx={{
            my: 2,
            color: "#777",
            display: "block",
            "&:hover": {
              color: "#f2e161",
            },
          }}
        >
          Назад
        </Button>
        <Button
          onClick={next}
          sx={{
            my: 2,
            color: "#777",
            display: "block",
            "&:hover": {
              color: "#f2e161",
            },
          }}
        >
          Вперёд
        </Button>
      </Grid>
      <StepWrapper
        activeStep={activeStep}
        steps={["Информация о альбоме", "Загрузите обложку", "Добавьте песни"]}
      >
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"Название альбома"}
              {...name}
            />
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"Автор"}
              {...artist}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUploadForm setFile={setPicture} accept="image/*">
            <Button
              sx={{
                my: 2,
                color: "#777",
                display: "block",
                "&:hover": {
                  color: "#f2e161",
                },
              }}
            >
              Загрузить Обложку
            </Button>
          </FileUploadForm>
        )}
        {activeStep === 2 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <WhiteBorderTextField {...query} />
            <Grid container display='flex'>
            <Grid overflow={'scroll'} style={{height: 300, width: '50%' }}>
              {songs.map((s) => (
                <Card
                  onClick={() => setChosenSongs([...chosenSongs, s])}
                  style={{
                    backgroundColor: "#121212",
                    padding: 10,
                    marginTop: 10,
                    width: "90%",
                    display: 'flex'
                  }}
                  key={s._id}
                >
                  <img
                    width={40}
                    height={40}
                    src={`${API_BASE_URL}/${s.picture}`}
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ width: 200, margin: "0 20px" }}
                  >
                    <div style={{color: '#fff'}}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "gray" }}>
                      {s.artist.name}
                    </div>
                  </Grid>
                </Card>
              ))}
            </Grid>
            <Grid overflow={'scroll'} style={{height: 300, width: '50%' }}>
            {chosenSongs.map((s) => (
                <Card
                  style={{
                    backgroundColor: "#121212",
                    padding: 10,
                    marginTop: 10,
                    width: "90%",
                    display: 'flex'
                  }}
                  key={s._id}
                >
                  <img
                    width={40}
                    height={40}
                    src={`${API_BASE_URL}/${s.picture}`}
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ width: 200, margin: "0 20px" }}
                  >
                    <div style={{color: '#fff'}}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "gray" }}>
                      {s.artist.name}
                    </div>
                  </Grid>
                </Card>
              ))}
            </Grid>
            </Grid>
          </Grid>
        )}
      </StepWrapper>
    </Grid>
  );
};

export default create;
