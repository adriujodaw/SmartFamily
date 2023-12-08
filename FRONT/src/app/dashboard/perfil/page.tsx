"use client";

import './page.css';
import { useSession, signOut } from "next-auth/react";
import { Waveform } from '@uiball/loaders';
import Link from "next/link";
import Image from 'next/image';





export default function Eventos() {
    const { data: session, status } = useSession();

    // Crear un objeto de fecha a partir de la cadena original
    const fecha = new Date(session?.user.fecha_nacimiento);

    // Obtener día, mes y año
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
    const anio = fecha.getUTCFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    if (session){

        console.log(session)
      
      return (
        <div>
          <div className='paginaPerfil cardPerfil'>
            <h2>Página perfil</h2>
          </div>
          <div className='containerPerfil'>
            <div className="datosPerfil">
              <Image className='iconoPerfil' src='/images/iconoUserPerfil.png' alt='Icono' width={180} height={180} />
              <div>
                <div className='card2Perfil'>
                  <label>Tu nombre:</label>
                </div>
                <div className="card3Perfil">
                  {session?.user.nombre}
                </div>
              </div>

              <div>
                <div className='card2Perfil'>
                  Tus apellidos:
                </div>
                <div className="card3Perfil">
                  {session?.user.apellidos}
                </div>
              </div>
              
              <div>
                <div className='card2Perfil'>
                  Rol en la familia:
                </div>
                <div className="card3Perfil">
                {session?.user.tipo.map((rol, index) => (
                  <label key={index}>{rol}</label>
                ))}
                </div>
              </div>

              <div>
                <div className='card2Perfil'>
                  Tu correo:
                </div>
                <div className="card3Perfil">
                  {session?.user.correo}
                </div>
              </div>

              <div>
                <div className='card2Perfil'>
                  Tu teléfono:
                </div>
                <div className="card3Perfil">
                  {session?.user.telefono}
                </div>
              </div>

              <div>
                <div className='card2Perfil'>
                  Tu fecha de nacimiento:
                </div>
                <div className="card3Perfil">
                  {fechaFormateada}
                </div>
              </div>

              <div>
                <div className='card2Perfil'>
                  Tu sexo:
                </div>
                <div className="card3Perfil">
                  {session?.user.sexo}
                </div>
              </div>
            </div>

            <button onClick={() => signOut()} className='button cerrarSesionPerfil'>Cerrar sesión</button>
            <button onClick={() => window.location.href = "./perfil/editar"} className='button cerrarSesionPerfil'>Editar perfil</button>
           
          </div>

          
        </div>
      )
    }


    if(status === "loading"){

      return  <div className="loading"><Waveform size={55} color="white" /></div>;
    }
      
    
  
  }