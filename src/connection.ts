import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

// Configurações de conexão
const connectionConfig = {
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  password: process.env.SENHA_DATABASE,
  database: process.env.DATABASE
};

// Cria uma conexão com o banco de dados
export const pool = mysql.createPool(connectionConfig);
