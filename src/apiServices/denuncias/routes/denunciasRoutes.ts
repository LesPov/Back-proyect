import express from 'express';
import { crearDenunciaAnonima } from '../controllers/denunciasAnonimas';
import { addTipoDenuncia, getTiposDenunciaAnonimas } from '../controllers/tiposDenunciasController';
import { getSubtiposDenuncia } from '../controllers/subtiposDenunciasController';
import { consultarDenunciaAnonima } from '../controllers/consultas/consultarDenunciaAnonima';
import { creaTiposDenunciaAnonimas } from '../controllers/tipo_de_denuncias/tipos_de_DenunciasController';

const router = express.Router();

router.post('/agregar_tipos', creaTiposDenunciaAnonimas);
router.get('/tipos/anonimas', getTiposDenunciaAnonimas);
// Nueva ruta para obtener los subtipos según el tipo de denuncia
router.get('/tipos/subtiposdenuncia/:nombreTipoDenuncia', getSubtiposDenuncia);

// Ruta para crear denuncia anónima
router.post('/denuncias', crearDenunciaAnonima);
router.get('/denuncias/consultas_anonimas', consultarDenunciaAnonima);

export default router;