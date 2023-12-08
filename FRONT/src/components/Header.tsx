"use client";
import './Header.css'
import { signOut, useSession } from "next-auth/react";
import {  useState } from 'react';
import Link from "next/link";
import Image from 'next/image';


//  Enlaces del menu que se visualizan si inicias sesión
const linksSession = [{
    label: 'Home',
    route: '/'
},  {
    label: 'Mi Casa',
    route: '/dashboard'
},  {
    label: 'Tareas',
    route: '/dashboard/tareas/pendientes'
},  {
    label: 'Eventos',
    route: '/dashboard/eventos'
},  {
    label: 'Perfil',
    route: '/dashboard/perfil'
}]

//  Enlaces del menu que se visualizan si inicias sesión
const linksFamilyLess = [{
    label: 'Home',
    route: '/'
},  {
    label: 'Crear una Casa',
    route: '/dashboard/crearcasa'
},  {
    label: 'Unirme a una Casa',
    route: '/dashboard/unirsecasa'
}]

//  Enlaces del menu que se visualizan sin iniciar sesión
const links = [{
    label: 'Home',
    route: '/'
},  {
    label: 'Iniciar sesión',
    route: '/login'
},  {
    label: 'Registrarse',
    route: '/register'
}]





export default function Header () {
    
    //  Declaro la sesión
    const { data: session } = useSession();
    let listaLinks = [];

    //  Si hay sesión iniciada compruebo si está en una casa
    if(session){
        
        //  Si está en una casa guardo en listaLinks los links de casa
        if(session?.user.id_casa){
            listaLinks.push(linksSession)
        }   
        
        //  Si no está en una casa doy otras opciones
        else    {
            listaLinks.push(linksFamilyLess)
        }
    }

    //  Si no está iniciada sesión 
    else {
        listaLinks.push(links)
    }


    //  Deveuelvo el menu
    return (
        <div className='styles.container'>
            <aside className='asideHeader'>
                <div className='tituloPagina'> 
                    <Image className='iconoHeader' src='/images/faviconBlanco.png' alt='Icono' width={80} height={80} />
                    <h1>SmartFamily</h1>
                </div>
                <Link href="/dashboard/perfil" className='usuarioAsideLink'>
                    <label>{session?.user.nombre}</label>
                    <img src="/images/iconoPerfilBlanco.png" alt="perfil" width={50} height={50}/>
                </Link>
            </aside>
            <div className='botonMenu'>
                <input type='checkbox' id='menu-toggle'  />            
                <label id='trigger' htmlFor='menu-toggle'></label>
                <label id='burger' htmlFor='menu-toggle'></label>
            
            <ul id='menu'>

                {listaLinks[0].map(({ label,route }) => (
                    <li key={route}>
                        <Link href={route}>
                            {label}
                        </Link>
                    </li>
                ))}
                <li>
                    <button onClick={() => signOut()} className='button cerrarSesion'>Cerrar sesión</button>
                </li>
            </ul>
            </div>
        </div>
    )
}