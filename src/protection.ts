import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Defina uma interface para o payload do JWT
interface UserPayload {
    username: string;
    role: string;
}

// Estenda o tipo Request
declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload; // Aqui você define o tipo de user
    }
}
const secretKey = 'asfd145a'; // Deve ser seguro e protegido

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers['authorization']?.split(' ')[1]; // Formato 'Bearer TOKEN'
    
    if (!token) return res.sendStatus(401); // Token ausente

    jwt.verify(token, secretKey, (err, user) => {
        
        if (err) return res.sendStatus(403); // Token inválido ou expirado
        req.user  = user as UserPayload;// Armazena as informações do token para uso posterior
        next();
    });
    
    
}
