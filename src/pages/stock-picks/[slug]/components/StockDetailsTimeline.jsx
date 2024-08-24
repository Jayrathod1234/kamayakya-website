import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/system';

const CustomStepConnector = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid #00bfa5`,
  height: '110px',
  marginLeft: '6px',
  marginTop: '-5px',
}));

const allSteps = [
  {
    date: '12 Jun 23',
    label: 'New Target 5',
    status: 'Active',
    buttonText: 'View Report',
    icon: '/assets/file.svg',
  },
  {
    date: '12 Jun 23',
    label: 'Video Released',
    status: '',
    description: 'Our Analysis on Exchange...',
    buttonText: 'Watch Video',
    icon: '/assets/video.svg',
  },
  {
    date: '12 Jun 23',
    label: 'Initiating Report',
    status: '',
    buttonText: 'View Report',
    icon: '/assets/file.svg',
  },
  {
    date: '15 Jul 23',
    label: 'Quarterly Review',
    status: '',
    description: 'Quarterly review meeting...',
    buttonText: 'View Review',
    icon: '/assets/review.svg',
  },
  {
    date: '20 Aug 23',
    label: 'Annual Report',
    status: '',
    description: 'Annual report summary...',
    buttonText: 'Read Report',
    icon: '/assets/report.svg',
  },
];

export default function CustomStepper() {
  const [visibleSteps, setVisibleSteps] = React.useState(3);

  const handleLoadMore = () => {
    setVisibleSteps((prev) => prev + 2);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', pt: 4 , backgroundColor:'white' }}>
      {allSteps.slice(0, visibleSteps).map((step, index) => (
        <Box key={index} display="flex" alignItems="flex-start" >
          <Box width="80px" textAlign="center" mr={2}>
            <Typography variant="body2" color="textSecondary">
              {step.date}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" position="relative" mr={2}>
            <Box
              sx={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: index === 0 ? '#00bfa5' : '#9e9e9e',
                position: 'relative',
                zIndex: 1,
                mb: '-6px',
                mr: '-5px',
              }}
            />
            <CustomStepConnector />
          </Box>

          <Box
            borderRadius="10px"
            bgcolor="background.paper"
            maxWidth={{ xs: '100%', sm: '450px' }}
            width="100%"
          >
            <Typography variant="subtitle1" fontWeight="bold" display="flex" alignItems="center">
              {step.label}
              {step.status && (
                <Box ml={1} px={1} py={0.5} borderRadius="5px">
                  <Typography color="orange">
                    {step.status}
                  </Typography>
                </Box>
              )}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="black" fontWeight="bold">
                {step.description}
              </Typography>
            </Box>

            {step.buttonText && (
              <Button
                size="small"
                sx={{
                  mt: 1,
                  color: '#344054',
                  border: '0.5px solid black',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'none',
                  minWidth: '100px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'background-color 0.3s, color 0.3s, filter 0.3s',
                  '&:hover': {
                    backgroundColor: '#125B54',
                    color: 'white',
                    '& img': {
                      filter: 'invert(1)',
                    },
                  },
                }}
              >
                {step.icon && <img src={step.icon} alt={step.label} style={{ width: '20px', height: '20px' }} />}
                {step.buttonText}
              </Button>
            )}
          </Box>
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={handleLoadMore}
        sx={{
          color: '#344054',
          borderColor: '#D0D5DD',
          borderRadius: '999px',
          padding: '8px 16px',
          textTransform: 'none',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '50px',
          gap: '8px',
          '&:hover': {
            backgroundColor: '#F9FAFB',
            borderColor: '#D0D5DD',
          },
        }}
      >
        <MoreHorizIcon sx={{ fontSize: '16px' }} />
        Load More
      </Button>
    </Box>
  );
}
