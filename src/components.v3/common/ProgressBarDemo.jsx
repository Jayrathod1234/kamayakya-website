import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AdjustIcon from '@mui/icons-material/Adjust';
import CircleIcon from '@mui/icons-material/Circle';
import { Check } from "lucide-react";

// Styled components
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
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#D0D5DD",
    borderTopWidth: 2,
    borderStyle: "dashed",
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  width: 22, // Ensure width for centering
  alignItems: "center",
  justifyContent: "center", // Center horizontally
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

// ProgressIndicator component
const ProgressIndicator = () => {
  const [completedSteps, setCompletedSteps] = React.useState([0, 1]); // Example completed steps

  const prices = [3725, 3740, 4470, 5364];
  const labels = ["Target-2", "CMP", "Target-3", "Target-4"];
  const dates = ["Jan 2024", "Feb 2024", "Mar 2024"];
  const [markerPositions, setMarkerPositions] = useState([]);
  const progressBarRef = useRef(null);

  const calculateMarkerPositions = () => {
    if (!progressBarRef.current) return;

    const progressBarWidth = progressBarRef.current.offsetWidth;

    const calculatedPositions = labels.map((label, index) => {
      const labelElement = document.getElementById(`label-${index}`);
      const labelWidth = labelElement ? labelElement.offsetWidth : 0;
      return (
        (index / (labels.length - 1)) * (progressBarWidth - labelWidth) +
        labelWidth / 2
      );
    });

    setMarkerPositions(calculatedPositions);
  };

  useEffect(() => {
    calculateMarkerPositions();
    window.addEventListener("resize", calculateMarkerPositions);

    return () => {
      window.removeEventListener("resize", calculateMarkerPositions);
    };
  }, []);

  return (
    <div className="max-w-full pe-2">
      <div className="flex justify-between items-center mb-5">
        {labels.map((label, index) => (
          <div key={index} className="flex flex-col items-center text-xs font-semibold">
            
            <span
              id={`label-${index}`}
              className="text-md flex"
            >
              {label}
              {completedSteps.includes(index) && (
              <Check
                style={{
                  color: "#12B76A",
                  width:"12px",
                  fontSize: 14,
                  marginLeft: 2,
                  fontWeight: "900",
                }}
              />
            )}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={progressBarRef}
        className="w-full h-[1px] bg-gray-200 rounded-full relative"
      >
        {markerPositions.map((position, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2"
            style={{ left: `${position}px`, top: '-10px' }} // Adjust top position as needed
          >
            <QontoStepIcon
              active={index === labels.length - 1}
              completed={index < labels.length - 2}
              isLastStep={index === labels.length - 1}
            />
          </div>
        ))}
        <div
          className="progress-bar h-[1px] bg-green-500 rounded-full"
          style={{ width: `${75}%` }} // Use a fixed value for progress width
        ></div>
      </div>

      <div className="flex justify-between text-gray-600 mt-2">
        {prices.map((price, index) => (
          <div key={index} className="text-center">
            <span className="block font-semibold text-sm">₹{price}</span>
            {index === labels.length - 1 && (
              <span className="text-orange-500 block ">Active</span>
            )}
            <span className="block text-xs">{dates[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
