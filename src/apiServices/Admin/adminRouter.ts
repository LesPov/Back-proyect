import { Router } from "express";
import validateToken from "../../middleware/validateToken/validateToken";
import validateRole from "../../middleware/validateRole/validateRole";

const adminRouter = Router();
/**
 *  GET /api/user/user
 *  Ruta protegida para los usuarios normales.
 *  Privado (solo para usuarios con rol 'user')
 */
adminRouter.get('/admin', validateToken, validateRole('Admin'), (req, res) => {
    res.send('Bienvenido, eres un administrador');
});

export default adminRouter;

