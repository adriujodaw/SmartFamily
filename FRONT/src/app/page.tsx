"use client";

import './page.css';
import { useSession } from "next-auth/react";
import React from 'react'
import Image from 'next/image';
// Mueve la importación de useRouter al componente donde lo necesitas
import { Waveform } from '@uiball/loaders'

import Link from 'next/link';




const HomePage = () => {


  

  const { data: session, status } = useSession();

  //  Si el estatus es loading muestro el objeto de carga
  if (status === "loading") {
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  }

  //  SI ESTA INICIADA SESION PERO NO TIENE CASA
  if (session && !session?.user.id_casa){
    return (
      <div>
        <div className='home card'>
          <h2>HomePage</h2>
          <div className="cardSecundaria">
            <p><Image src="/images/saludo-2.png" alt="" width={25} height={25}/> Buenas, ¡nos alegramos de verte de nuevo {session?.user.nombre}!</p>
          </div>
          <div className="cardSecundaria home sinCasa">
          <h2>¡No tienes casa!</h2>
          <h3>¿Qué deseas hacer?</h3>
          <hr />
          <div className='containerCasas'>
            <div className="administrarCasa crearCasa">
              <h4>Crear casa</h4>
              <p>¿No tienes ninguna casa asignada y te gustaría tenerla? Crea tu propia casa y podrás asignarle crear tareas y eventos para los participantes de la casa</p>
              <button className="button" onClick={() => window.location.href = '/dashboard/crearcasa'}>CREAR CASA</button>
            </div>
            <div className="administrarCasa unirteCasa">
              <h4>Unirte a una casa</h4>
              <p>¿Tus convivientes ya tienen creada una casa y te quieres unir? Pídeles el código de la casa e introdúcelo para poder unirte. El código lo puede generar el usuario de una casa existente en el apartado 'Mi Casa'</p>
              <button className="button" onClick={() => window.location.href = '/dashboard/unirsecasa'}>UNIRTE A UNA CASA</button>
            </div>
          </div>
        </div>
        </div>
        
        
      </div>
      
    )
  }

  //  SI TIENE INICIADA SESIÓN Y TIENE CASA
  else if (session && session?.user.id_casa){
    return (
      <div>
        <div className='cardHome'>
          <h2>HomePage</h2>
          <p><Image src="/images/saludo-2.png" alt="" width={25} height={25}/> Buenas, ¡nos alegramos de verte de nuevo {session?.user.nombre}!</p>
        </div>

        <Link href='/dashboard/tareas/pendientes'>
          <div className="cardHome flexHome">
            <img src="./images/iconoTareas.png" alt="" width={130}/>
            <label>
            ¿Tienes metas pendientes o tareas por concluir? ¡Es hora de poner manos a la obra! Haz clic en esta tarjeta y sumérgete en tu lista de tareas pendientes. Ya sea que busques mejorar tus habilidades, alcanzar nuevos objetivos o simplemente aprovechar al máximo tu tiempo en casa, aquí encontrarás la inspiración que necesitas.
            <br/>
            <br/>
            ¡Explora tus tareas por completar ahora! 🎯
            </label>
          </div>
        </Link>


        <Link href='/dashboard/eventos'>
          <div className="cardHome flexHome der">
            <img src="./images/iconoEventos.png" alt="" width={130} height={130}/>
            <label>
            ¡Explora los eventos que te esperan! 📅
            <br/>
            No te pierdas lo que está por venir en nuestro calendario de eventos. Desde charlas inspiradoras hasta experiencias únicas, tenemos algo especial reservado para ti. ¡La diversión está a solo un clic de distancia!            <br/>
            <br/>
            ¡Explora tus eventos ahora!🎉 
            </label>
          </div>
        </Link>

        
        
      </div>
      
    )
  }

  //  SI NO TIENE INICIADA SESIÓN
  else {

    return (
      <div>
        <div className='home card'>
          <h2>HomePage</h2>
          <div className="cardSecundaria">
            <p><Image src="/images/saludo-2.png" alt="" width={25} height={25}/> Buenas, ¡inicia sesión o regístarte para empezar a disfrutar!</p>
          </div>
          <div className="cardSecundaria home sinCasa">
          <h2>¡No tienes iniciada sesión!</h2>
          <h3>¿Qué deseas hacer?</h3>
          <hr />
          <div className='containerCasas'>
            <div className="administrarCasa crearCasa">
              <h4>¡Inicia sesión!</h4>
              <p>Si ya tienes cuenta puedes iniciar sesión para volver a disfrutar de nuestros servicios.</p>
              <button className="button" onClick={() => window.location.href = '/login'}>Iniciar sesión</button>
            </div>
            <div className="administrarCasa unirteCasa">
              <h4>¡Registrarse!</h4>
              <p>¿Quieres tener organizadas tus tareas, eventos y todos los detalles de tu casa junto a tus convivientes? Únete a nosotros y podras disfrutar de todas esas ventajas</p>
              <button className="button" onClick={() => window.location.href = '/register'}>¡Registrate!</button>
            </div>
          </div>
        </div>
        </div>
        
        
      </div>
      
    )
  }

}

export default HomePage