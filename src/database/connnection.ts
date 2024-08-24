

import { Sequelize } from "sequelize";


const sequelize = new Sequelize('proyecto-u', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
 
