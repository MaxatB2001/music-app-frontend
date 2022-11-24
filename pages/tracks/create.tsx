import { Button, Grid, styled, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUploadForm from "../../components/forms/FileUploadForm";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
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

const create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      if (picture && audio != null) {
        formData.append("picture", picture);
        formData.append("audio", audio);
      }
      axios
        .post(`${API_BASE_URL}/track`, formData)
        .then(data => console.log(data))
        // .then((resp) => router.push("/tracks"))
        // .catch((e) => console.log(e));
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <StepWrapper activeStep={activeStep} steps={["Информация о песне", "Загрузите обложку", "Загрусите песню"]}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"Название песни"}
              {...name}
            />
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"Автор"}
              {...artist}
            />
            <WhiteBorderTextField
              style={{ marginTop: 10 }}
              label={"текст песни"}
              multiline
              rows={3}
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
          <FileUploadForm setFile={setAudio} accept="audio/*">
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
              Загрузить песню
            </Button>
          </FileUploadForm>
        )}
      </StepWrapper>
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
    </Grid>
  );
};

export default create;
