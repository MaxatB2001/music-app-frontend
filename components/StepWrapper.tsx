import {
  Card,
  Grid,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  stepLabelClasses,
  Stepper,
  styled,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

type StepWrapperProps = {
  activeStep: number;
  children: (boolean | JSX.Element)[] | boolean | JSX.Element;
  steps: Array<string>
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#f2e161",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#f2e161",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const ColorlibStepLabel = styled(StepLabel)(() => ({
  [`& .${stepLabelClasses.label}`]: {
    [`&.${stepLabelClasses.completed}`]: {
      color: "#f2e161",
    },
    [`&.${stepLabelClasses.active}`]: {
      color: "rgb(255, 255, 255, 0.9)",
    },
    color: "rgb(255, 255, 255, 0.3)",
  },
}));

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, steps, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <ColorlibStepLabel>{step}</ColorlibStepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 270 }}
      >
        <Card style={{ width: 600, backgroundColor: "rgba(163, 158, 158, 1)" }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
