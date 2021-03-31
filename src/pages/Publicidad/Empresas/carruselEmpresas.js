import { Box, Typography } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteCarousel from 'react-leaf-carousel';

export default function Carrusel() {
    return (
    <>
      <Box textAlign="center" >
        <Typography color="primary" variant="h3">
          Empresas Afiliadas
        </Typography>
      </Box>
      <InfiniteCarousel
        dots={true}
        showSides={true}
        sidesOpacity={.5}
        sideSize={.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        <div>
          <img
            alt=''
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          />
        </div>
        
      </InfiniteCarousel>
    </>
  )
} 