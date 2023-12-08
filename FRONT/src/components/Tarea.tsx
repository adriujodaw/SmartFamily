"use client";

import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from "next-auth/react";
import 'swiper/css';
import './Tarea.css';
import { Waveform } from '@uiball/loaders'



const Tarea = () => {
    //  Declaro una constante para almacenar las tareas y guardo la sesión y el status
    const [tareas, setTareas] = useState([]);
    const { data: session, status } = useSession();
    const [slidesPerView, setSlidesPerView] = useState(3);

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
    



    
    //  Función que ataca a la API y regoge las tareas
    const getTareas = async() => {
      // Vacío el array tareas
      setTareas([])
      

      //  Ataco a la API con una peticion GET a /tareas/id_casa y con el token del usuario en la cabecera
      const res =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tareas/${session?.user.id_casa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        }
      })
      
      //  Guardo la respuesta en una constante
      const data = await res.json();

      //  Guardo la respuesta en tareas
      setTareas(data)


    }

    //  Cada vez que se carga la página conmprueba que haya sesión y ejecuta la funcion getTareas()
    useEffect(() => {
      
      if (session){
        console.log(session?.user)
        getTareas();
      } 


        
    }, [session, status])


    const completarTarea = async (idtarea: String) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tarea/completar/${idtarea}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-acces-token": `${session?.user.token}`
            }
          }
        );
    
        if (response.ok) {
          // La solicitud PUT fue exitosa
          console.log(`Tarea con ID ${idtarea} marcada como completada.`);
        } else {
          // Manejar errores si la respuesta no es exitosa
          console.error(`Error al marcar la tarea con ID ${idtarea} como completada.`);
        }

        window.location.reload()
      } catch (error) {
        console.error("Error al realizar la solicitud PUT:", error);
      }
    };


    //  Si el estatus es loading devuelvo un objeto de carga 
    if(status === "loading"){
      return <div className="loading"><Waveform size={55} color="white" /></div>;
    }

    //  Si está iniciada sesión devuelvo las tareas
    if(session){
      return (
        <div className='tareasContainer'>
          <h1>Tareas</h1>
          <div className='container'>
            <div className="swipperContainer">
            <Swiper
              spaceBetween={50}
              slidesPerView={slidesPerView}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {tareas.map((tarea) => (
                <SwiperSlide key={tarea?.idtareas}>
                  <div className='card' key={tarea?.idtareas}>
                    <h2 className='titulo1'>{tarea.nombre}</h2>
                    <hr></hr>
                    <div className='datosTarea'>
                      <p className='titulo2'>Descripcion:</p>
                      <p>{tarea.descripcion}</p>
                      <p className='titulo2'>Participantes: </p>
                      <ul>
                        {tarea.participantes.map((participante) => (
                          <li>{participante}</li>
                          
                        ))}
                      </ul> 
                      <p className='titulo2'>Estado:</p>
                      <p>{tarea.estado}</p>
                      <p className='titulo2'>Fecha de Creación:</p>
                      <p>{tarea.fecha_creacion}</p>
                      <p className='titulo2'>Fecha Completada:</p>
                      <p>{tarea.fecha_completada}</p>
                    </div>
                    
                  </div>
                  <button className='button completarTarea' onClick={() => completarTarea(tarea.idtareas)}>Marcar completada</button>
                </SwiperSlide>
              ))}
            </Swiper>
              
            </div>
            <div className="pagination">

            </div>

          </div>

          


        </div>
      );
    }
  };
  export default Tarea;

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
  