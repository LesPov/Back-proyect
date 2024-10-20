import express from 'express';
import { addTipoDenuncia, getTiposDenunciaAnonimas, getTiposDenunciaOficiales } from '../controllers/tiposDenunciasController';

const router = express.Router();

router.post('/agregar_tipos', addTipoDenuncia);
router.get('/tipos/anonimas', getTiposDenunciaAnonimas);
// Nueva ruta para obtener tipos de denuncias oficiales o ambas
router.get('/tipos/oficiales', getTiposDenunciaOficiales);

// Nueva ruta para obtener subtipos de denuncias

export default router;