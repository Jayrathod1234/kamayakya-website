import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@nextui-org/react';

const SMEToggle = ({ isSME, toggleSME }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Button
        onClick={() => toggleSME(false)}
        style={{
          background: !isSME ? '#0072F5' : '#e5e5e5',
          color: !isSME ? '#fff' : '#000',
          borderRadius: '10px 0 0 10px',
        }}
      >
        Main Board Stocks
      </Button>
      <Button
        onClick={() => toggleSME(true)}
        style={{
          background: isSME ? '#0072F5' : '#e5e5e5',
          color: isSME ? '#fff' : '#000',
          borderRadius: '0 10px 10px 0',
        }}
      >
        SME Board Stocks
      </Button>
    </Box>
  );
};

export default SMEToggle;
