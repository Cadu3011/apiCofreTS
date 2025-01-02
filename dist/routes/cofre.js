"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cofreController_1 = require("../controller/cofreController");
const allowedip = ['::ffff:177.200.115.10', '::ffff:186.194.81.125', '::ffff:177.200.115.1'];
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    const ip = req.ip;
    console.log('IP do cliente:', ip);
    if (allowedip[0] === ip || ip === '::1' || allowedip[1] === ip || allowedip[2] === ip) {
        next();
    }
    else {
        res.status(403).send('acesso negado');
    }
});
router.get('/deleteSaldoAtual', (cofreController_1.cofreController.DeleteSaldoAtual));
router.get('/listCofre', (cofreController_1.cofreController.listSaldos));
router.get('/listMoves', (cofreController_1.cofreController.movimentosCofre));
router.get('/saldoAnt', (cofreController_1.cofreController.saldoAnterior));
router.post('/addCofre', (cofreController_1.cofreController.addFilialCofre));
router.put('/conferSaldo', (cofreController_1.cofreController.conferSaldoFilial));
exports.default = router;
