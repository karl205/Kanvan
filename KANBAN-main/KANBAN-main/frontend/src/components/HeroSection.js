import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from '../videos/video-1.mp4';
import { useAuth0 } from '@auth0/auth0-react';

function HeroSection() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted /> 
      <h1>ORGANIZA TAREAS CON KANVAN</h1>
      <p>Que estas esperando?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          INVITADO
        </Button>
        <Button
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
        onClick={() => {
          
          loginWithRedirect();
  }}
>
  INICIAR <i className='far fa-play-circle' />
</Button>
      </div>
    </div>
  );
}

export default HeroSection;