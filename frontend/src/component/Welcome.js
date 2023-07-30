import { Grid, Typography } from "@material-ui/core";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
//import CameraIcon from '@mui/icons-material/PhotoCamera';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jmbanner from "../../src/images/banner-21.png";
import jmbanner2 from "../../src/images/roundedTriangle.png";
import jobseek from "../../src/images/software-removebg-preview.png";
import jobrecurit from "../../src/images/carreer-removebg-preview.png";
import hexagon from "../../src/images/hexagon-orange-huge.png";
import square from "../../src/images/roundedSquare.png";

import './welcome.css'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme({
  typography: {
    fontFamily: ['"Varela Round"', 'Open Sans'].join(',')
   }
 })
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Welcome = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            width:'100%'
          }}
        >
          <Container maxWidth="lg">
            <Grid sx={{ justifyContent: 'center' }} container spacing={0} >
              <Grid item xs={6} sm={6} md={6}>
                <div className="jm-banner-img">
                  <img className="jm-banner-bg-1" src={jmbanner2}>
                  </img>
                  <img className="jm-banner-img-1 borderImgSeek"  src={jmbanner}>
                  </img>
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6}> 
              <Box sx={{ justifyContent: 'center'}}>
             
              <Typography style={{fontFamily:"Varela Round"}} variant="h2" component="h2">
              Do what you Love, begin your journey now with us.
              </Typography>
              <Typography style={{fontFamily:"Varela Round",marginTop:'20px'}} variant="h5" component="h5">
              Best Solution, Best Career, Great Offer
              </Typography> 
              <Stack spacing={2} sx={{mt:5}} direction="row">
                <Button sx={{p:1.25}} variant="contained">Find your next hire</Button>
                <Button sx={{p:1.25}}  variant="outlined">Find your next job</Button>
              </Stack>
              </Box>
             
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            width:'100%',
            mt:15
          }}
        >
          <Container  maxWidth="lg">
            <Grid sx={{ justifyContent: 'center' }} container spacing={0} >
            <Grid item xs={6} sm={6} md={6}> 
              <Box sx={{ justifyContent: 'center'}}>
              <Typography style={{fontFamily:"Varela Round",marginTop:'20px'}} variant="h5" component="h5">
              WHAT WE DO.
              </Typography> 
              <Typography style={{fontFamily:"Varela Round"}} variant="h2" component="h2">
               Are you a Career Seeker ?
              </Typography>
              <Typography style={{fontFamily:"Varela Round",marginTop:'20px'}} variant="h5" component="h5">
              Unique jobs at startups and tech companies you can't find anywhere
              </Typography>
        
              <Stack spacing={2} sx={{mt:5}} direction="row">
                <Button sx={{p:1.25}} variant="contained">Find your next hire</Button>
                <Button sx={{p:1.25}}  variant="outlined">Find your next job</Button>
              </Stack>
              </Box>
             
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div className="jm-banner-img">
                  <img className="jm-banner-bg-1" src={hexagon}>
                  </img>
                  <img className="jm-banner-img-1 borderImgSeek" src={jobrecurit}>
                  </img>
                </div>
              </Grid>
              
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            width:'100%',
            mt:15
          }}
        >
          <Container maxWidth="lg">
            <Grid sx={{ justifyContent: 'center' }} container spacing={0} >
            <Grid item xs={6} sm={6} md={6}>
                <div className="jm-banner-img">
                  <img className="jm-banner-bg-1 square" src={square}>
                  </img>
                  <img className="jm-banner-img-1 borderImgSeek"  src={jobseek}>
                  </img>
                </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6}> 
              <Box sx={{ justifyContent: 'center'}}>
              <Typography style={{fontFamily:"Varela Round",marginTop:'20px'}} variant="h5" component="h5">
              WHAT WE DO.
              </Typography> 
              <Typography style={{fontFamily:"Varela Round"}} variant="h2" component="h2">
               Are you a Job Recruiter ?
              </Typography>
              <Typography style={{fontFamily:"Varela Round",marginTop:'20px'}} variant="h5" component="h5">
              Startup-ready candidates, with all the information you need to vet them, Everything you need to kickstart your recruiting get job posts.
              </Typography>
              <Stack spacing={2} sx={{mt:5}} direction="row">
                <Button sx={{p:1.25}} variant="contained">Find your next hire</Button>
                <Button sx={{p:1.25}}  variant="outlined">Find your next job</Button>
              </Stack>
              </Box>
            </Grid>
              
            </Grid>
          </Container>
        </Box>
        <Container sx={{ py: 8,display:'none' }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        AEROMATE
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          LET’S MAKE SOMETHING TOGETHER
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
