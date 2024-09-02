"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MySQLAdapter = require('@bot-whatsapp/database/mysql');
// Crear el adaptador de base de datos Mock
const databaseindex = new MySQLAdapter({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'proyecto-u',
});
exports.default = databaseindex;
