import express from 'express';
import { crearDenunciaAnonima } from '../controllers/denunciasAnonimas';
import { addTipoDenuncia, getTiposDenunciaAnonimas } from '../controllers/tiposDenunciasController';
import { getSubtiposDenuncia } from '../controllers/subtiposDenunciasController';

const router = express.Router();

router.post('/agregar_tipos', addTipoDenuncia);
router.get('/tipos/anonimas', getTiposDenunciaAnonimas);
// Nueva ruta para obtener los subtipos según el tipo de denuncia
router.get('/tipos/subtiposdenuncia/:nombreTipoDenuncia', getSubtiposDenuncia);

// Ruta para crear denuncia anónima
router.post('/denuncias', crearDenunciaAnonima);

export default router;