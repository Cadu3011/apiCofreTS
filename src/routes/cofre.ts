import {Router} from 'express'
import { cofreController } from '../controller/cofreController'

const router = Router()
router.get('/deleteSaldoAtual',(cofreController.DeleteSaldoAtual))
router.get('/listCofre',(cofreController.listSaldos))
router.get('/listMoves',(cofreController.movimentosCofre))
router.get('/saldoAnt',(cofreController.saldoAnterior))
router.get('/movsAtual',(cofreController.movimentosAtuaisCofre))
router.get('/movAnterior',(cofreController.movimentoAnteriorCofre))
router.post('/addCofre',(cofreController.addFilialCofre))
router.put('/conferSaldo',(cofreController.conferSaldoFilial))


export default router