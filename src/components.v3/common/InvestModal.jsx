import React from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Grid,
    Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from 'react-scroll'; // This Button is assumed to be a custom button; you might need to adjust imports based on your setup

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const brokerItems = [
    { src: '/assets/p1.png', alt: 'Groww', name: 'Groww' },
    { src: '/assets/p5.png', alt: 'Zerodha', name: 'Zerodha' },
    { src: '/assets/p6.png', alt: 'Angel One', name: 'Angel One' },
    { src: '/assets/p2.png', alt: 'Upstox', name: 'Upstox' },
    { src: '/assets/p3.png', alt: 'ICICIdirect', name: 'ICICIdirect' },
    { src: '/assets/p4.png', alt: 'Kotak', name: 'Kotak Securities' },
    { src: '/assets/p7.png', alt: 'HDFC Securities', name: 'HDFC Securities' },
    { src: '/assets/p8.png', alt: 'Motilal Oswal', name: 'Motilal Oswal' },
    { src: '/assets/chevron-right.png', alt: '+9 more', name: '+9 more' }, // Replace with correct path for Chevron icon
];

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Typography id="child-modal-title" variant="h6">
                        Text in a child modal
                    </Typography>
                    <Typography id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </Typography>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const [childOpen, setChildOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>
                <ChevronRightIcon className="inline-block w-10 h-10 text-white" fontSize="large" />
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="broker-modal-title">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        transitionDuration: 2000,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography id="broker-modal-title" variant="h6">
                            Choose your broker
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={1}>
                        {brokerItems.map((item, index) => (
                            <Grid item xs={4} key={index}>
                                <Box
                                    onClick={() => index === brokerItems.length - 1 && handleChildOpen()}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: '#f0f0f0',
                                        borderRadius: 2,
                                        p: 1,
                                        transition: 'background-color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={item.src}
                                        alt={item.alt}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            mb: 1,
                                            objectFit: 'cover', // Ensure image fits the container
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <Typography variant="body2">{item.name}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
