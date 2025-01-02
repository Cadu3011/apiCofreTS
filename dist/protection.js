"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'asfd145a'; // Deve ser seguro e protegido
function authenticateToken(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Formato 'Bearer TOKEN'
    if (!token)
        return res.sendStatus(401); // Token ausente
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err)
            return res.sendStatus(403); // Token inválido ou expirado
        req.user = user; // Armazena as informações do token para uso posterior
        next();
    });
}
