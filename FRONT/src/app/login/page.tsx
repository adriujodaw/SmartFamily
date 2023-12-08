"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import'./page.css'

const LoginPage = () => {

  
  const [errors, setErrors] = useState<string[]>([]);
  const [correo, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  if( session ) {
    router.push("/")
  }
  
  
  


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

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
    console.log(errors)
  };

  return (
    <div className="contenedorDiv">
      <div className="contenedorLogin">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="correo"
            className="form-control mb-2"
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
          <button
            type="submit"
            className="button"
          >
            Iniciar Sesión
          </button>
        </form>


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

export default LoginPage;
