"use client";

import { useSession, } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './page.css';

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [codigo, setCodigo] = useState<string>("");
  
  const router = useRouter();
  const { data: session, update } = useSession();

  console.log(session?.user)
  if(session?.user.id_casa){
    console.log("tiene casa")
    router.push("/dashboard");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


    // Función para actualizar el session.user.id_casa del lado del servidor
    async function actualizarIdCasa(idnuevo:String){
      console.log("Actualizando id_casa")
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

    const uid = session?.user.id

    // Creo la nueva casa
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invitacion/unirse/${codigo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-acces-token": `${session?.user.token}`
        },
        body: JSON.stringify({
          uid
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

   

    // Envío al usuario a /dashboard
    router.push("/dashboard");
  };

  return (
    <div className="contenedorDiv">
      <div className="contenedorRegister">
        <h1>Unirse a una casa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código de invitacion"
            name="codigo"
            className=""
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
          />
          <button
            type="submit"
            className="button"
          >
            Unirme a esa casa
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
