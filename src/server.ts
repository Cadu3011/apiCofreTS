import express, { NextFunction } from 'express'
import router from './routes/cofre'
import Cors from 'cors'
import dotenv from 'dotenv'
import {authenticateToken} from './protection'
import jwt from 'jsonwebtoken';
const app = express()
dotenv.config()
const PORT = process.env.PORT 

app.use(Cors())
app.use(express.json())
app.use(authenticateToken)
app.use('/api', router)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})