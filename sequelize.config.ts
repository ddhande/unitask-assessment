// sequelize.config.ts
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Disable logging of SQL queries (optional)
  }
);

export default sequelize;
