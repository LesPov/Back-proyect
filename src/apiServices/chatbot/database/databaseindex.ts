const MySQLAdapter = require('@bot-whatsapp/database/mysql')

// Crear el adaptador de base de datos Mock
const databaseindex = new MySQLAdapter({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'proyecto-u',
});
export default databaseindex;



