import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const generateEncryptedId = async () => {
  try {
    // Genera un UUID (por ejemplo, v4)
    const uuid = uuidv4();
    

    // Reemplaza las barras ("/") en el UUID con guiones bajos ("_")
    const safeUUID = uuid.replace(/\//g, '_');

    // Encripta el UUID utilizando bcrypt
    const saltRounds = 10;
    const encryptedId = await bcrypt.hash(safeUUID, saltRounds);

    // Reemplaza las barras de las ids para que no haya conflicto en la url al consultar a la api por id
    const safeEncryptedId = encryptedId.replace(/[\/$]/g, '_');

    return safeEncryptedId;
  } catch (error) {
    console.error('Error al generar y encriptar el ID:', error);
    throw error; // O maneja el error de acuerdo a tus necesidades
  }
};



export const methods = {
    generateEncryptedId
};