import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL as string;

async function connectDB() {
// Cria uma conexão com o banco de dados
 const pool = await mysql.createConnection(DATABASE_URL);

   return pool
}

export const pool = connectDB()