"use client";

import Evento from '../../../components/Evento';
import './page.css';
import { useSession } from "next-auth/react";
import { Waveform } from '@uiball/loaders';
import Link from "next/link";
import { useRouter } from "next/navigation";





export default function Eventos() {
    const { data: session, status } = useSession();
    const router = useRouter();




    if (status !== "loading"){
      if(!session?.user.id_casa){
        router.push("/dashboard")
      }

      
      return (
        <div className='paginaEventos'>
          <Evento />
          <Link href="/dashboard/eventos/crear">
            <button className='button crearTareaButton'>Crear evento</button>
          </Link>
        </div>
      )
    }

    else {
      return  <div className="loading"><Waveform size={55} color="white" /></div>;
    }
  
  }