import React from 'react';
import { Box, Button, Card, Container, Grid, Typography, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HotStocks = () => {
  return (
    <Container sx={{ mt: 5, pb: 14 }}>
      <Card sx={{ bgcolor: '#f7f8fa', borderRadius: 2, p: 2 }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, px: 4, py: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Hot Stocks (3)
          </Typography>
          <Typography variant="body2" sx={{ pt: 1, color: 'gray' }}>
            Top stocks to invest in right NOW!
          </Typography>

          <Box sx={{ bgcolor: '#f7f8fa', backgroundImage: 'url(/assets/grid.png)', backgroundSize: 'cover', py: 9, px: 10, display: 'flex', alignItems: 'center', borderRadius: 2, mt: 4 }}>
            <Box sx={{ width: { sm: '33%', xs: '50%' } }}>
              <LockIcon sx={{ fontSize: 46 }} />
              <Typography variant="h5" sx={{ pt: 2, textAlign: 'left' }}>
                Gain exclusive access to
                <span style={{ color: '#108973' }}> 30+ potential multibagger picks </span>
                with KamayaKya membership.
              </Typography>
              <Button variant="contained" sx={{ mt: 3 }} onClick={() => alert('Explore Plans')}>
                Explore Plans
              </Button>
            </Box>

            <Box sx={{ width: { sm: '67%', xs: '50%' } }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ position: 'relative', borderRadius: 1, border: '1px solid #FEC84B', boxShadow: 1 }}>
                    <Box sx={{ position: 'absolute', top: '-1rem', left: '7rem', zIndex: 20 }}>
                      <img src="/assets/hottab.png" alt="" style={{ width: '160px' }} />
                    </Box>

                    <Box sx={{ p: 2, display: 'flex', gap: 3, alignItems: 'center' }}>
                      <LockIcon sx={{ fontSize: 19 }} />
                      <Box sx={{ height: 5, bgcolor: '#EDF0F5', borderRadius: 5, minWidth: '281px' }}></Box>
                      <Tooltip title="Please become a member to watch this video.">
                        <img src="/assets/play.gif" alt="" style={{ width: 24, filter: 'blur(2px)' }} />
                      </Tooltip>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ p: 0.5, borderRadius: 2, border: '1px solid #FEF0C7', bgcolor: '#FEF0C7', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img src="/assets/streamline_hotel-air-conditioner-solid.svg" alt="" style={{ width: 12 }} />
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#A3651A' }}>Air Conditioners</Typography>
                        </Box>
                        <Box sx={{ p: 0.5, borderRadius: 2, border: '1px solid #FEF0C7', bgcolor: '#FEF0C7', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img src="/assets/Component 8.svg" alt="" style={{ width: 12 }} />
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#667085' }}>
                            MCap:
                            <Box sx={{ ml: 1, mr: 1, width: 47, height: 12, bgcolor: '#FFEED9', borderRadius: 10 }}></Box>
                          </Typography>
                        </Box>
                        <Box sx={{ p: 0.5, borderRadius: 2, border: '1px solid #FEF0C7', bgcolor: '#FEF0C7' }}>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#667085' }}>Deep Value</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ px: 2, pb: 2 }}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: '#f7f8fa' }}>
                        <Box sx={{ borderRadius: 1, bgcolor: '#108973', color: '#fff', textAlign: 'center', p: 1 }}>
                          <Tooltip title="Upside Left means how much the stock price could rise from its current level." arrow>
                            <InfoIcon />
                          </Tooltip>
                          <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>12.24%</Typography>
                          <Typography variant="body2">likely within a year</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <img src="/assets/Layer_1.svg" alt="" style={{ width: '14px' }} />
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Total Returns</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <img src="/assets/Polygon 2.svg" alt="" style={{ width: '12px' }} />
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>64.08%</Typography>
                            <Typography variant="caption" sx={{ color: '#6E6E6E' }}>in less than a month</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Button variant="outlined" startIcon={<LockIcon />} endIcon={<ArrowForwardIosIcon />} sx={{ borderRadius: 3, color: '#125B54', fontWeight: 'bold' }}>
                        Become a Member
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default HotStocks;
