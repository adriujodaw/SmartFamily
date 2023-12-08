"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './page.css';
import { stat } from "fs";
import { Waveform } from '@uiball/loaders'


const RegisterPage = () => {

  const { data: session, status } = useSession();

  const [errors, setErrors] = useState<string[]>([]);
  const [nombre, setName] = useState<string>("");
  const [participantes, setParticipantes] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  //const [id_casa, setIdCasa] = useState<string>("");
  const router = useRouter();
  if(!session?.user.id_casa){
    router.push("/dashboard")
  }


  if (status == "loading"){
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  } else {



    const id_casa = session?.user.id_casa
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrors([]);
      


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-acces-token": `${session?.user.token}`
          },
          body: JSON.stringify({
            nombre,
            ubicacion,
            participantes,
            fecha,
            hora,
            id_casa
          }),
        }
      );

      const responseAPI = await res.json();
      console.log(responseAPI.message)

      if (!res.ok) {
        setErrors([responseAPI.message]);
        console.log(errors)
        return;
      }

      // Redirecciona a la página /dashboard/tareas
      router.push('/dashboard/eventos');

    };

    return (
      <div className="contenedorDiv">
        <div className="contenedorRegister">
          <h1>Nuevo evento</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              className=""
              value={nombre}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Ubicacion"
              name="ubicacion"
              className=""
              value={ubicacion}
              onChange={(event) => setUbicacion(event.target.value)}
            />
            <input
              type="text"
              placeholder="Correo de  los participantes separados por comas"
              name="participantes"
              className=""
              value={participantes}
              onChange={(event) => setParticipantes(event.target.value)}
            />
            <input
              type="Date"
              name="fecha"
              className=""
              value={fecha}
              onChange={(event) => setFecha(event.target.value)}
            />
            <input
              type="Time"
              name="hora"
              className=""
              value={hora}
              onChange={(event) => setHora(event.target.value)}
            />
            <input
              type="hidden"
              name="id_casa"
              value={id_casa}
              onChange={(event) => setIdCasa(event.target.value)}
            />
            <button
              type="submit"
              className="button"
            >
              Añadir evento
            </button>
          </form>
          <pre>
          {errors}
        </pre>

          {errors.length > 0 && (
            <div className="alert alert-danger mt-2">
              <ul className="mb-0">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  
};
export default RegisterPage;