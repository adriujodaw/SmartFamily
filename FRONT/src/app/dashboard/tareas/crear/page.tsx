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
  const [descripcion, setDescripcion] = useState<string>("");
  const [participantes, setParticipantes] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  //const [id_casa, setIdCasa] = useState<string>("");
  const router = useRouter();


  if (status == "loading"){
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  } else {

    if(session?.user.tipo.includes("Hijo")){
      router.push("/dashboard/tareas");
    }



    const id_casa = session?.user.id_casa
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrors([]);
      


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tarea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-acces-token": `${session?.user.token}`
          },
          body: JSON.stringify({
            nombre,
            descripcion,
            participantes,
            estado,
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
      router.push('/dashboard/tareas');

    };

    return (
      <div className="contenedorDiv">
        <div className="contenedorRegister">
          <h1>Crear tarea</h1>
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
              placeholder="Descripcion"
              name="descripcion"
              className=""
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
            />
            <input
              type="text"
              placeholder="Correos de los participantes separados por comas"
              name="correo"
              className=""
              value={participantes}
              onChange={(event) => setParticipantes(event.target.value)}
            />
            <select
              name="estado"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
            >
              <option value="">Seleccionar Estado</option>
              <option value="Sin Empezar">Sin Empezar</option>
              <option value="Empezada">Empezada</option>
              <option value="Avanzada">Avanzada</option>
            </select>
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
              Crear
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
