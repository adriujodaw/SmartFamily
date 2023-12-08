"use client";
import { useSession } from "next-auth/react";
import { Waveform } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import './page.css'
import { CLIENT_RENEG_LIMIT } from "tls";

const Dashboard = () => {


  
  const { data: session, status, update } = useSession();
  console.log(session?.user)

  const [datosCasa, setDatosCasa] = useState(null); // Inicialmente, los datos de la casa son nulos
  const [adminCasa, setAdminCasa] = useState(null); // Inicialmente, los datos de la casa son nulos
  const [miembrosCasa, setMiembrosCasa] = useState<any[]>(); ; // Inicialmente, los datos de la casa son nulos

  useEffect(() => {
    const obtenerDatosCasa = async () => {
      // Recojo los datos de la casa
      try {
        const resCasa = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/casa/${session?.user.id_casa}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-acces-token": `${session?.user.token}`,
            },
          }
        );

        

        // Compruebo la respuesta de la API para ver que está todo correcto
        const datosCasa = await resCasa.json();
        setDatosCasa(datosCasa); // Actualizo el estado con los datos obtenidos

        // Recojo los datos del administrador
        const resAdmin = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/correo/${datosCasa[0]?.administrador}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-acces-token": `${session?.user.token}`,
            },
          }
        );

        const datosAdmin = await resAdmin.json();
        setAdminCasa(datosAdmin);

        let usuarios = []

        console.log("Miembros de la casa.");
        
        console.log(datosCasa[0]?.miembros);
        
        // Recojo los datos de todos los usuarios
        for (let i = 0; i < datosCasa[0]?.miembros.length; i++) {
          const element = datosCasa[0]?.miembros[i];
          console.log(element)
          const resMiembro = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/correo/${element}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-acces-token": `${session?.user.token}`,
              },
            }
          );
          const datosMiembro = await resMiembro.json();
          console.log(datosMiembro)
          usuarios.push(datosMiembro)
            
        }
        



        setMiembrosCasa(usuarios);

        
        console.log(miembrosCasa);
        
        
      } catch (error) {
        console.error("Error al obtener datos de la casa:", error);
      }
    };

    obtenerDatosCasa(); // Llamo a la función al montar el componente
  }, [session]);
  
  

  //  Si el estatus es loading muestro el objeto de carga
  if (status === "loading" || datosCasa === null || adminCasa === null) {
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  }


  const crearCodigoInvitacion = async () =>{
    const idCasa = session?.user.id_casa

    // Elimino los codigos antiguos
    const del = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invitaciones`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
      }
    );


    // Creo un código de invitacion
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invitacion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
        body: JSON.stringify({
          idCasa
        }),
      }
    );

    // Compruebo la respuesta de la api para ver que esta todo correcto
    const responseAPI = await res.json();
    console.log(responseAPI.codigo)
    window.alert(responseAPI.message)




  }

  const cambiarRol = async (id:String) =>{

    // Elimino los codigos antiguos
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/cambiorol/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
      }
    );
    console.log("Recargar")

    const nuevosRoles = await res.json();
    
    window.location.reload();


  }



  
  //  Muestro en la página el usuario
  if(session?.user.tipo.includes('Administrador')){
    return (
      <div>
        <div className='paginaCasa cardCasa'>
          <div className="tituloCasa">
            <h2>Mi casa</h2>
          </div>
            
            
          <div className='containerCasa'>
            <div className="datosCasa">
              <Image className='iconPerfil' src='/images/iconoHomeDashboard.png' alt='Icono' width={180} height={180} />
              <div>
                <div className='card2Casa'>
                  <label>Nombre de mi casa:</label>
                </div>
                <div className="card3Casa">
                  {datosCasa[0]?.nombre}
                </div>
              </div>

              
                
              <div>
                <div className='card2Casa'>
                  Administrador:
                </div>
                <div className="card3Casa">
                  {adminCasa[0]?.nombre}
                </div>
              </div>


              {miembrosCasa?.[0]?.[0]?.nombre ? (
                <div>
                  <div className='card2Casa'>
                    Miembros:
                  </div>
                  <div className="card3Casa">
                    {miembrosCasa?.map((miembro, index) => (
                      <div className="cardCasa miembrosCasa" key={miembro[0].id}>
                        <label className="miembroCasa">
                          {miembro[0].nombre} ({miembro[0].nombre !== '¡No tienes ningún integrante todavía!' ? miembro[0].tipo.join(', ') : ''})
                        </label>
                        {miembro[0].tipo && (
                          <button className="button cambiarRol" onClick={() => cambiarRol(miembro[0].uid)}>
                            {miembro[0].tipo.includes('Hijo') ? 'Asignar como padre' : 'Asignar como hijo'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ''
              )}

              
            </div>
            <button className="button crearCodigo" onClick={crearCodigoInvitacion}>Crear código invitacion</button>
          </div>
        </div>
        
      </div>
    );
  } else {
    return (
      <div>
        <div className='paginaCasa cardCasa'>
          <div className="tituloCasa">
            <h2>Mi casa</h2>
          </div>
            
            
          <div className='containerCasa'>
            <div className="datosCasa">
              <Image className='iconPerfil' src='/images/iconoHomeDashboard.png' alt='Icono' width={180} height={180} />
              <div>
                <div className='card2Casa'>
                  <label>Nombre de mi casa:</label>
                </div>
                <div className="card3Casa">
                  {datosCasa[0]?.nombre}
                </div>
              </div>

              
                
              <div>
                <div className='card2Casa'>
                  Administrador:
                </div>
                <div className="card3Casa">
                  {adminCasa[0]?.nombre}
                </div>
              </div>


              {miembrosCasa?.[0]?.[0]?.nombre ? (
                <div>
                  <div className='card2Casa'>
                    Miembros:
                  </div>
                  <div className="card3Casa">
                    {miembrosCasa?.map((miembro, index) => (
                      <div className="cardCasa miembrosCasa" key={miembro[0].id}>
                        <label className="miembroCasa">
                          {miembro[0].nombre} ({miembro[0].nombre !== '¡No tienes ningún integrante todavía!' ? miembro[0].tipo.join(', ') : ''})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ''
              )}

              
            </div>
            <button className="button crearCodigo" onClick={crearCodigoInvitacion}>Crear código invitacion</button>
          </div>
        </div>
        
      </div>
    );

  }
};
export default Dashboard;
