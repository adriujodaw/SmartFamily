"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Waveform } from '@uiball/loaders'

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  console.log({session, status})

  // ___________________________________ CARGANDO ___________________________________
  if (status === "loading") {
    return <div className="loading"><Waveform size={55} color="white" /></div>;
  }
  // ___________________________________ SESIÓN INICIADA ___________________________________
  if (session) {
    return (
      <>
        Signed in as {session.user?.nombre} <br />
        <button
          onClick={() => signOut()}
          className="button"
        >
          Sign out
        </button>
      </>
    );
  }
  // ___________________________________ SESIÓN NO INICIADA ___________________________________
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="button"
      >
        Sign in
      </button>
    </>
  );
}
