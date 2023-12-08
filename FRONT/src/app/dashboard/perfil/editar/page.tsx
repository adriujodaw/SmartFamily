"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import'./page.css'


const EditarUser = () => {

  const { data: session, status } = useSession();

  
  const [errors, setErrors] = useState<string[]>([]);
  const [nombre, setNombre] = useState<string | undefined>(session?.user.nombre);
  const [apellidos, setApellidos] = useState<string | undefined>(session?.user.apellidos);
  const [correo, setEmail] = useState<string | undefined>(session?.user.correo);
  const [telefono, setTelefono] = useState<string | undefined>(session?.user.telefono);
  const [fecha_nacimiento, setFechaNacimiento] = useState<string | undefined>(session?.user.fecha_nacimiento);
  const [sexo, setSexo] = useState<string | undefined>(session?.user.sexo);
  const router = useRouter();


  useEffect(() => {
    setNombre(session?.user.nombre);
    setApellidos(session?.user.apellidos);
    setEmail(session?.user.correo);
    setSexo(session?.user.sexo);
    setTelefono(session?.user.telefono);
    const fechaFormateada = session?.user.fecha_nacimiento.slice(0, 10);
    setFechaNacimiento(fechaFormateada);
  }, [session?.user]);
  console.log(session?.user);
  

  
  const editarUser = async (iduser: String) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/${iduser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-acces-token": `${session?.user.token}`
          },
          body: JSON.stringify({
            nombre,
            apellidos,
            correo,
            sexo,
          }),
        }
      );
  
      if (response.ok) {
        // La solicitud PUT fue exitosa
        console.log(`Usuario modificado.`);
      } else {
        // Manejar errores si la respuesta no es exitosa
        console.error(`Error al eliminar el usuario con ID ${iduser}.`);
      }

      window.location.reload()
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    
    



    router.push("/dashboard/perfil");
    console.log(errors)
  };
  console.log(nombre);

  return (
    <div className="contenedorDiv">
      <div className="contenedorEditarUser">
        <img src="/images/iconoUserPerfil.png" className="imgEditPerfil" width={130} height={130}/>

          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            className="form-control mb-2"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
          <input
            type="text"
            placeholder="Apellidos"
            name="apellidos"
            className="form-control mb-2"
            value={apellidos}
            onChange={(event) => setApellidos(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="correo"
            className="form-control mb-2"
            value={correo}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Telefono"
            name="telefono"
            className="form-control mb-2"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />
          <input
            type="date"
            name="fecah_nacimiento"
            className="form-control mb-2"
            value={fecha_nacimiento}
            onChange={(event) => setTelefono(event.target.value)}
          />
          <input
            type="text"
            placeholder="Sexo"
            name="sexo"
            className="form-control mb-2"
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
          />
          <button
            type="submit"
            className="button"
            onClick={() =>  session?.user.id && editarUser(session.user.id)}
          >
            Editar Información
          </button>


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

export default EditarUser;
