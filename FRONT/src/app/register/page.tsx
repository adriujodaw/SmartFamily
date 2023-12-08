"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './page.css';
import { Waveform } from '@uiball/loaders'


const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [nombre, setName] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [correo, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);


    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          correo,
          password,
          sexo,
          telefono,
          fecha_nacimiento,
          tipo
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

    const responseNextAuth = await signIn("credentials", {
      correo,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/");
  };

  return (
    <div className="contenedorDiv">
      <div className="contenedorRegister">
        <h1>Register</h1>
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
            placeholder="Apellidos"
            name="nombre"
            className=""
            value={apellidos}
            onChange={(event) => setApellidos(event.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            name="correo"
            className=""
            value={correo}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="form-control mb-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="text"
            placeholder="Telefono"
            name="telefono"
            className=""
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />
          <input
            type="date"
            name="fecha_nacimiento"
            className=""
            value={fecha_nacimiento}
            onChange={(event) => setFecha_nacimiento(event.target.value)}
          />
          <select
            name="sexo"
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
          >
            <option value="">Seleccionar sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </select>
          <input
            type="hidden"
            name="tipo"
            value="f47ac10b-58cc-4372-a567-0e02b2c3d479"
            onChange={(event) => setTipo(event.target.value)}
          />
          <button
            type="submit"
            className="button"
          >
            Register
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
