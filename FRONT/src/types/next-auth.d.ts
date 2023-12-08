import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      correo: string;
      token: string;
      nombre: string;
      id_casa: string;
      tipo: Array;
      id: string;
      sexo: string;
      family_points: string;
      apellidos: string;
      telefono: string;
      fecha_nacimiento: string;
    };
  }
}