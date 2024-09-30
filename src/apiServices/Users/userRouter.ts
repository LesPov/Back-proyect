import { Router } from "express";
import validateToken from "../../middleware/validateToken/validateToken";
import validateRole from "../../middleware/validateRole/validateRole";

const userRouter = Router();
/**
 *  GET /api/user/user
 *  Ruta protegida para los usuarios normales.
 *  Privado (solo para usuarios con rol 'user')
 */
userRouter.get('/user', validateToken, validateRole('user'), (req, res) => {
    res.send('Bienvenido, eres un usuario normal');
});

export default userRouter;
