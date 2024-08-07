import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircleIcon from "@mui/icons-material/Circle";
import AdjustIcon from "@mui/icons-material/Adjust";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 1px)",
    right: "calc(50% + 2px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#32D583",
      borderStyle: "solid",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#32D583",
      borderStyle: "solid",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#D0D5DD",
    borderTopWidth: 2,
    borderStyle: "dashed",
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#32D583",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#1ACE1B",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    color: "#1D9387",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-lastStepIcon": {
    color: "#FF7F09",
    zIndex: 1,
    fontSize: 18,
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className, isLastStep } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {isLastStep ? (
        <GpsFixedIcon className="QontoStepIcon-lastStepIcon" />
      ) : completed ? (
        <AdjustIcon className="QontoStepIcon-completedIcon" />
      ) : (
        <CircleIcon className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  isLastStep: PropTypes.bool,
};

const steps = ["Target 2", "Target 3", "CMP", "Target 4"];

export default function ProgressBar() {
  const [completedSteps, setCompletedSteps] = React.useState([0, 1]); // Example completed steps

  const renderLabelWithCheck = (label, index) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{label}</span>
        {completedSteps.includes(index) && (
          <Check
            style={{
              color: "#12B76A",
              fontSize: 14,
              marginLeft: 2,
              fontWeight: "900",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper alternativeLabel activeStep={2} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <QontoStepIcon
                  {...props}
                  isLastStep={index === steps.length - 1}
                />
              )}
            >
              {renderLabelWithCheck(label, index)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
