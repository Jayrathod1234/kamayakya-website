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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from 'react-scroll'; // Adjust this import as needed

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
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
    { src: '/assets/p9.png', alt: '+9 more', name: '+9 more' },
];

const brokerItems2 = [
    { src: '/assets/i2.png', alt: 'Paytm Money', name: 'Paytm Money' },
    { src: '/assets/i1.png', alt: 'Sharekhan', name: 'Sharekhan' },
    { src: '/assets/i3.png', alt: 'Dhan', name: 'Dhan' },
    { src: '/assets/i4.png', alt: '5paisa', name: '5paisa' },
    { src: '/assets/i5.png', alt: 'IIFL Securities', name: 'IIFL Securities' },
    { src: '/assets/i6.png', alt: 'AxisDirect', name: 'AxisDirect' },
    { src: '/assets/i7.png', alt: 'Geojit', name: 'Geojit' },
    { src: '/assets/i8.png', alt: 'Fyers', name: 'Fyers' },
    { src: 'https://s3-alpha-sig.figma.com/img/fdda/de25/9d78e1e3d0583fe1ddbdac0a25fd0a26?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ovB4ydW~XHKYxvw3-v71E4IjSaDKfPnlLv1-sbKkvan9J31IBPUqZwE7d0SV3-9FScPQXtXqQQ~vv9q2Xd4I-vcQY5MFlqeqw6qC6bIP2juaawLajzusqCflLN0eGWtPVqEvpXemJovPSZKE5pwC9jj0AC-81Fq3qdhDQd7yPhIempI0YbUAAjuDzI1s0svl3J7G6EBxV7QB8CNwNL7~1VGbXoXAbZyR9RS2VaiK80vhDkhF3nL6qSh-H1a3gdsST~~eLUaCFMIC8y4a-JvQhWSwlWSkB7EOfKZ9qxCv1Ki8C1EmXUZBTX4s5qqbT8NGf4O4pLu40X8G4jH105fdmg', alt: 'Choice Broking', name: 'Choice Broking' },
];

function ChildModal({ open, handleBack }) {
    return (
        <Modal
            open={open}
            onClose={handleBack}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon /> {/* Back icon to close child modal and show the nested modal */}
                    </IconButton>
                    <IconButton onClick={handleBack}>
                        <CloseIcon /> {/* Close icon to close the child modal */}
                    </IconButton>
                </Box>
                <Grid container spacing={1}>
                    {brokerItems2.map((item, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                 sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: '#f9fafb',
                                    borderRadius: 2,
                                    p: 0.5,
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor:  '#f1f5f9',
                                    },
                                }}
                            >
                                <Avatar
                                        src={item.src}
                                        alt={item.name}
                                        sx={{
                                            width: 48,
                                            height:  48,
                                            mb: 1,
                                            color: index === brokerItems.length - 1 ? 'white' : 'inherit',
                                            backgroundColor: 'transparent', // green background for the last avatar
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#344054' }}>{item.name}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Modal>
    );
}



export default function NestedModal() {
    const [modalState, setModalState] = React.useState({
        isMainModalOpen: false,
        isChildModalOpen: false,
    });

    const handleMainModalOpen = () => setModalState({ isMainModalOpen: true, isChildModalOpen: false });
    const handleMainModalClose = () => setModalState({ isMainModalOpen: false, isChildModalOpen: false });
    const handleChildModalOpen = () => setModalState({ isMainModalOpen: false, isChildModalOpen: true });
    const handleChildModalClose = () => setModalState({ isMainModalOpen: true, isChildModalOpen: false });

    return (
        <div>
            <Button onClick={handleMainModalOpen}>
                <ChevronRightIcon className="inline-block w-10 h-10 text-white" fontSize="large" />
            </Button>
            <Modal open={modalState.isMainModalOpen} onClose={handleMainModalClose} aria-labelledby="broker-modal-title">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography id="broker-modal-title" variant="h6" sx={{ color: '#344054', fontWeight: 'bold' }}>
                            Choose your broker
                        </Typography>
                        <IconButton onClick={handleMainModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={1}>
                        {brokerItems.map((item, index) => (
                            <Grid item xs={4} key={index}>
                                <Box
                                    onClick={() => index === brokerItems.length - 1 ? handleChildModalOpen() : null}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: '#f9fafb',
                                        borderRadius: 2,
                                        p: 0.5,
                                        transition: 'background-color 0.3s',
                                        '&:hover': {
                                            backgroundColor:  '#f1f5f9',
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={item.src}
                                        alt={item.name}
                                        sx={{
                                            width: index === brokerItems.length - 1 ? 36 : 48,
                                            height: index === brokerItems.length - 1 ? 36 : 48,
                                            mb: 1,
                                            color: index === brokerItems.length - 1 ? 'white' : 'inherit',
                                            backgroundColor: index === brokerItems.length - 1 ? '#125B54' : 'transparent', // green background for the last avatar
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#344054' }}>{item.name}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>                     
            <ChildModal open={modalState.isChildModalOpen} handleBack={handleChildModalClose} />
        </div>
    );
}

