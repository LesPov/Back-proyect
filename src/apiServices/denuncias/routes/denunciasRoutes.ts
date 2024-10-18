import express from 'express';
import { addTipoDenuncia, getTiposDenuncia } from '../controllers/denunciasController';

const router = express.Router();

router.post('/agregar_tipos', addTipoDenuncia);
router.get('/tipos', getTiposDenuncia);

export default router;