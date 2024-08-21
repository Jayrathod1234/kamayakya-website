import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Customized styles
const CustomStepConnector = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid #00bfa5`,
  height: '60px',  // Ensure height is enough for visibility
  marginLeft: '16px', // Adjust the margin to align with the dot
  marginTop: '8px', // Align with the top of the dot
}));

const steps = [
  {
    date: '12 Jun 23',
    label: 'New Target 5',
    status: 'Active',
    description: '1-page report...',
    buttonText: 'View Report',
    icon: '📄', // Using an emoji for simplicity; you can replace it with an actual icon
  },
  {
    date: '12 Jun 23',
    label: 'Video Released',
    status: '',
    description: 'Our Analysis on Ion Exchange...',
    buttonText: 'Watch Video',
    icon: '🎥',
  },
  {
    date: '12 Jun 23',
    label: 'Initiating Report',
    status: '',
    description: '1-page report...',
    buttonText: 'View Report',
    icon: '📄',
  },
];

export default function CustomStepper() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', pt: 4 }}>
      {steps.map((step, index) => (
        <Box key={index} display="flex" alignItems="flex-start" mb={4}>
          {/* Date Section */}
          <Box width="100px" textAlign="center">
            <Typography variant="body2" color="textSecondary">
              {step.date}
            </Typography>
          </Box>

          {/* Connector Line */}
          <Box display="flex" alignItems="flex-start" flexShrink={0}>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === 0 ? '#00bfa5' : '#9e9e9e',
                position: 'relative',
                zIndex: 1,
                marginRight: '10px',
              }}
            />
            {index < steps.length - 1 && <CustomStepConnector />}
          </Box>

          {/* Content Section */}
          <Box p={2} borderRadius="10px" bgcolor="background.paper" boxShadow={2} flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="bold" display="flex" alignItems="center">
              {step.label}
              {step.status && (
                <Box ml={1} px={1} py={0.5} bgcolor="orange" borderRadius="5px">
                  <Typography variant="caption" color="white">
                    {step.status}
                  </Typography>
                </Box>
              )}
            </Typography>

            <Box mt={1} display="flex" alignItems="center" gap={1}>
              {step.icon && <span style={{ fontSize: '20px' }}>{step.icon}</span>}
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </Box>

            {step.buttonText && (
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                {step.buttonText}
              </Button>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
