"use client";
import Tarea from '../../../components/Tarea';
import './page.css'
import { Waveform } from '@uiball/loaders'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Tareas() {
  
  const { data: session, status } = useSession();
  const router = useRouter();


  if(status == "loading"){
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  } else {
    if(!session?.user.id_casa){
      router.push("/dashboard")
    } else {
      if(session?.user.tipo.includes('Hijo')){
        return (
          <div>
            <Tarea />
            <button className='button crearTareaButton' onClick={() => window.location.href = 'tareas/pendientes'}>Tareas pendientes</button>
            <button className='button crearTareaButton' onClick={() => window.location.href = 'tareas/completadas'}>Tareas completadas</button>
          </div>
        )
      } else {
        return (
          <div>
            <Tarea />
            <button className='button crearTareaButton' onClick={() => window.location.href = 'tareas/pendientes'}>Tareas pendientes</button>
            <button className='button crearTareaButton' onClick={() => window.location.href = 'tareas/completadas'}>Tareas completadas</button>
            <button className='button crearTareaButton' onClick={() => window.location.href = 'tareas/crear'}>Crear tarea</button>
          </div>
        )
      }

    }


  
  }
}