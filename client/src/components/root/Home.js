import React from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import Fire from '../../images/fire.svg';
import { Header, } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
      <HomeContainer>
        <CanvasContainer id='canvas-container'>
          <ParticlesContainer params={settings}>
          </ParticlesContainer>
        </CanvasContainer>
      </HomeContainer>
    );
  };
};

const CanvasContainer = styled.div`
  /* position: relative; */
`;

const HomeContainer = styled.div`
  background: #363b4d;
  background: -moz-linear-gradient(top, #363b4d 0%, #40485d 100%);
  background: -webkit-linear-gradient(top, #363b4d 0%,#40485d 100%);
  background: linear-gradient(to bottom, #363b4d 0%,#40485d 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#363b4d', endColorstr='#40485d',GradientType=0 );
  height: 1000px;
`;

const ParticlesContainer = styled(Particles)`
  margin-top: -100px;
  width: 100%;
  height: 100%;
  /* z-index: 1 !important; */
  /* pointer-events: none; */

`;

const FireContainer = styled.img`
  z-index: 999;
  width: 100%;
  height: 250px;
  position: absolute;
`;

const settings = {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#0ef"
    },
    "shape": {
      "type": "edge",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 1,
        "height": 1
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 48.7246327380807,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2.5,
      "direction": "top",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

export default Home;
