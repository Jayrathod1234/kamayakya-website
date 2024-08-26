import React from 'react';
import {Box} from '@mui/material';
import {Button} from '@nextui-org/react';

const SMEToggle = ({isSME, toggleSME}) => {
    return (

    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 5, mt: 5}}>
        <Box
            onClick={() => toggleSME(false)}
            sx={{
                cursor: 'pointer',
                padding: 2,
                borderRadius: 1,
                backgroundColor: isSME ? 'grey.300' : 'primary.main',
                color: isSME ? 'black' : 'white',
                marginRight: 2,
                textAlign: 'center',
            }}
        >
            Main Board Stocks
        </Box>
        <Box
            onClick={() => toggleSME(true)}
            sx={{
                cursor: 'pointer',
                padding: 2,
                borderRadius: 1,
                backgroundColor: !isSME ? 'grey.300' : 'primary.main',
                color: !isSME ? 'black' : 'white',
                textAlign: 'center',
            }}
        >
            SME Board Stocks
        </Box>
    </Box>
)
    ;
};


export default SMEToggle;
