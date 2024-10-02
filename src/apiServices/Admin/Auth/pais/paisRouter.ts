
import express from 'express';
import { getAllCountryCodes } from './paisController';

const countryPais = express.Router();

// Ruta para obtener todos los códigos de país
countryPais.get('/countries', getAllCountryCodes);

export default countryPais;
