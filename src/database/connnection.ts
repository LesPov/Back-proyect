

import { Sequelize } from "sequelize";


const sequelize = new Sequelize('ojoconeso', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    
});

export default sequelize;
 
