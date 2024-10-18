import express from 'express';
import { addTipoDenuncia, getTiposDenuncia, getTiposDenunciaAnonimas } from '../controllers/denunciasController';

const router = express.Router();

router.post('/agregar_tipos', addTipoDenuncia);
router.get('/tipos', getTiposDenuncia);
router.get('/tipos/anonimas', getTiposDenunciaAnonimas);

// Nueva ruta para obtener subtipos de denuncias

export default router;