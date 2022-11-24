import {
  Button,
  Card,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import { Album, Track } from "../../types/track";
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
    const responce = await fetch(`${API_BASE_URL}/album/search?query=${query}`);
    const data = await responce.json();
    return data;
  } catch (e) {
    throw e;
  }
};

const createSection = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const title = useInput("");
  const query = useInput("");
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [chosenAlbums, setChosenAlbums] = useState<Array<Album>>([]);

  const next = () => {
    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const ids = chosenAlbums.map(album => album._id)      
      axios.post(`${API_BASE_URL}/selections`, {title: title.value, albumIds: JSON.stringify(ids)}).then(data => console.log(data))
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    searchQuery(query.value)
      .then((data) => setAlbums(data))
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
        steps={["Введите заголовок", "Выберите альбомы"]}
      >
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"Заголовок"}
              {...title}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <WhiteBorderTextField {...query} />
            <Grid container display='flex'>
            <Grid overflow={'scroll'} style={{height: 300, width: '50%' }}>
              {albums.map((s) => (
                <Card
                  onClick={() => setChosenAlbums([...chosenAlbums, s])}
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
            {chosenAlbums.map((s) => (
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

export default createSection;
