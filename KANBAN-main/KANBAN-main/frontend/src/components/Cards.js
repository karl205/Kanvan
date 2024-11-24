import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import chat from './images/ChatGPT.jpg';
import calendar from './images/calendario.jpg';


function Cards() {
  return (
    <div className='cards'>
      <h2>Esto podras hacer en el Kanvan</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/src/images/img-9.jpg'
              text='Crear tareas diarias y asignarlas a columnas en un tablero Kanban'
              label='Principal'
              //path='/services'
            />
            <CardItem
              src='/src/images/img-2.jpg'
              text='Interactua con youtube y reproductor de musica'
              label='Herramienta'
             // path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/src/'
              text='Añadir y consultar un calendario personal'
              label='Herramienta'
             // path='/services'
            />
            <CardItem
              src={calendar}
              text='Añadir y consultar un calendario personal'
              label='Herramienta'
              //path='/products'
            />
            <CardItem
              src='/images/img-8.jpg'
              text='Planificar el día con hora, actividad, prioridad y fecha de cumplimiento'
              label='Herramienta'
              //path='/sign-up'
            />
            <CardItem
            
              src={chat}
              text='Interactua con ChatGPT'
              label='Herramienta'
              //path='/sign-up'
            />
            
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;