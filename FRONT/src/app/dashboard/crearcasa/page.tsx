"use client";

import { useSession, } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './page.css';

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [nombre, setName] = useState<string>("");
  
  const router = useRouter();
  const { data: session, update } = useSession();

  // Si ya tiene casa le envío a /dashboard
  console.log(session?.user)
  if(session?.user.id_casa){
    router.push("/dashboard");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    // Función para actualizar el session.user.id_casa del lado del servidor
    async function actualizarIdCasa(idnuevo:String){
      await update({
        ...session,
        user:{
          ...session?.user,
          id_casa: idnuevo
        }
      })
    }

    event.preventDefault();
    setErrors([]);

    // Lo asigno como el administrador
    const administrador = session?.user.correo;

    // Creo la nueva casa
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/casa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
        body: JSON.stringify({
          nombre, 
          administrador
        }),
      }
    );

    // Compruebo la respuesta de la api para ver que esta todo correcto
    const responseAPI = await res.json();
    console.log(responseAPI.message)

    //Si no está correcto almaceno los errores
    if (!res.ok) {
      setErrors([responseAPI.message]);
      console.log(errors)
      return;
    }
    // Guardo el id_casa que me dieron
    const id_casa = responseAPI.id_casa

    //  Actualizo la variable de sesión de id_casa
    actualizarIdCasa(id_casa);

    // Guardo el id del usuario en una variable
    const id = session?.user.id


    // Añado el id_casa al usuario
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/nuevacasa/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
        body: JSON.stringify({
          id, 
          id_casa
        }),
      }
    );
    // Compruebo la respuesta de la api para ver que esta todo correcto
    const responseAPI2 = await res2.json();
    console.log(responseAPI2.message)

    //Si no está correcto almaceno los errores
    if (!res2.ok) {
      setErrors([responseAPI2.message]);
      console.log(errors)
      return;
    }

    // Envío al usuario a /dashboard
    router.push("/dashboard");
  };

  return (
    <div className="contenedorDiv">
      <div className="contenedorRegister">
        <h1>Crear nueva casa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            className=""
            value={nombre}
            onChange={(event) => setName(event.target.value)}
          />
          <button
            type="submit"
            className="button"
          >
            Crear Casa
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
};
export default RegisterPage;
