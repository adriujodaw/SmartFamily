import {Router} from "express"
import {methods as authController} from "../controlers/auth.controller"
import {verifySingUp} from "../middlewares"

//  Creo un objeto Router (es un objeto de express)
const router=Router();



//  ------------------------ POST ------------------------
//  REGISTRO USUARIO
router.post("/api/auth/register", [verifySingUp.checkRolesExisted, verifySingUp.checkDuplicatedEmail], authController.signUp);
//  LOGIN USUARIO
router.post("/api/auth/login", authController.signIn);





export default router;