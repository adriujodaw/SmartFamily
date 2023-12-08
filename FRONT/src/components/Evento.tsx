"use client";

import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from "next-auth/react";
import 'swiper/css';
import './Evento.css';
import { Waveform } from '@uiball/loaders'



const Dashboard = () => {
    //  Declaro la sesión, el status, un array para almacenar los eventos que no han pasado y los elementos que ya han pasado
    const [eventosProximos, setEventoProximo] = useState([]);
    const [eventosPasados, setEventoPasados] = useState([]);
    const { data: session, status } = useSession();
    const [slidesPerView, setSlidesPerView] = useState(3);


    const eliminarEvento = async (idevento: String) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento/${idevento}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-acces-token": `${session?.user.token}`
            }
          }
        );
    
        if (response.ok) {
          // La solicitud PUT fue exitosa
          console.log(`Evento con ID ${idevento} eliminado.`);
        } else {
          // Manejar errores si la respuesta no es exitosa
          console.error(`Error al eliminar el evento con ID ${idevento}.`);
        }

        window.location.reload()
      } catch (error) {
        console.error("Error al realizar la solicitud DELETE:", error);
      }
    };

    useEffect(() => {
      const handleResize = () => {
        // Actualiza el número de diapositivas basado en el ancho de la pantalla
        if (window.innerWidth < 768) {
          setSlidesPerView(1);
        } else if (window.innerWidth < 992) {
          setSlidesPerView(2);
        } else {
          setSlidesPerView(3);
        }
      };
  
      // Llama a handleResize al cargar la página y cuando cambia el tamaño de la ventana
      handleResize();
      window.addEventListener('resize', handleResize);
  
      // Limpia el evento de cambio de tamaño cuando el componente se desmonta
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
    



    
    //  Función que obtiene los eventos pasados y los próximos
    const getEventos = async() => {
      //  Vacío los eventos pasados
      setEventoPasados([]);
      //  Ataco a la API con una petición GET a /eventos (le paso en la cabecera el token)
      const res =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eventos/${session?.user.id_casa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        }
      })
  
      //  Guardo en la constante data el json de respuesta
      const data = await res.json();
      
      //  Desde la api el primer objeto son los eventos que han pasado y el segundo los próximos
      setEventoProximo(data[1])
      setEventoPasados(data[0])


    }

    // Cada vez que se recarga la página comprueba que está la sesión iniciada y recoge los eventos
    useEffect(() => {
      
      if (session){
        getEventos();
      } 

    }, [session, status])


    //  Si el estatus es loading envía el objeto de carga
    if(status === "loading"){
      return <div className="loading"><Waveform size={55} color="white" /></div>;
    }

    //  Si está iniciada la sesión devuelve dos div con los eventos pasados y próximos
    if(session){
      return (
        <div className="tareas">

          <div className="eventosProximos">
            <h1>Eventos Proximos</h1>

            <div className='container'>
              <div className="swipperContainer">
              <Swiper
                spaceBetween={50}
                slidesPerView={slidesPerView}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {eventosProximos.map((evento) => (
                  <SwiperSlide key={evento[0]?.ideventos}>
                    <div className='card' key={evento?.ideventos}>
                      <h2 className='titulo1'>{evento.nombre}</h2>
                      <hr></hr>
                      <div className='datosTarea'>
                        <p className='titulo2'>Participantes: </p>
                        <ul>
                          {evento.participantes.map((participante) => (
                            <li>{participante}</li>
                            
                          ))}
                        </ul> 
                        <p className='titulo2'>Fecha:</p>
                        <p>{evento.fecha}</p>
                      </div>
                      

                    </div>
                    <button className='button completarEvento' onClick={() => eliminarEvento(evento.ideventos)}>Eliminar evento</button>
                  </SwiperSlide>
                ))}
              </Swiper>
                
              </div>
              <div className="pagination">

              </div>
            </div>
          </div>

          <div className="eventosPasados">
            <h1>Eventos Pasados</h1>

            <div className='container'>
              <div className="swipperContainer">
              <Swiper
                spaceBetween={50}
                slidesPerView={slidesPerView}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {eventosPasados.map((evento) => (
                  <SwiperSlide key={evento[0]?.ideventos}>
                    <div className='card' key={evento?.ideventos}>
                      <h2 className='titulo1'>{evento.nombre}</h2>
                      <hr></hr>
                      <div className='datosTarea'>
                        <p className='titulo2'>Participantes: </p>
                        <ul>
                          {evento.participantes.map((participante) => (
                            <li>{participante}</li>
                            
                          ))}
                        </ul> 
                        <p className='titulo2'>Fecha:</p>
                        <p>{evento.fecha}</p>
                      </div>

                    </div>
                    
                    <button className='button completarEvento' onClick={() => eliminarEvento(evento.ideventos)}>Eliminar evento</button>
                  </SwiperSlide>
                ))}
              </Swiper>
                
              </div>
              <div className="pagination">

              </div>
            </div>
          </div>

        </div>
      );
    }
  };
  export default Dashboard;

  /*
          <ul>
        {tareas.map((tarea) => (
                <li key={tarea.idtareas}>
                  <h2>{tarea.nombre}</h2>
                  <p>{tarea.descripcion}</p>
                  <p>Participantes: {tarea.participantes}</p>
                  <p>Estado: {tarea.estado}</p>
                  <p>Fecha de Creación: {tarea.fecha_creacion}</p>
                  <p>Fecha Completada: {tarea.fecha_completada}</p>
              </li>
            ))}
        </ul>
        */
  