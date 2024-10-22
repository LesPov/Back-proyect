import express from 'express';
import { addTipoDenuncia } from '../controllers/tiposDenunciasController';
import { crearDenunciaAnonima } from '../controllers/denunciasAnonimas';

const router = express.Router();

router.post('/agregar_tipos', addTipoDenuncia);
// router.get('/tipos/anonimas', getTiposDenunciaAnonimas);
// // Nueva ruta para obtener tipos de denuncias oficiales o ambas
// router.get('/tipos/oficiales', getTiposDenunciaOficiales);

// Ruta para crear denuncia anónima
router.post('/denuncias', crearDenunciaAnonima);

export default router;