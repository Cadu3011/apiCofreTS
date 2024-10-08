import {Router} from 'express'
import { cofreController } from '../controller/cofreController'

const allowedip = ['::ffff:177.200.115.10','::ffff:186.194.81.125', '::ffff:177.200.115.1']
const router = Router()
router.use((req, res, next) => {
    const ip = req.ip
    console.log('IP do cliente:', ip);
    if(allowedip[0] === ip || ip === '::1' || allowedip[1] === ip || allowedip[2] === ip){
      next();
    }else{
      res.status(403).send('acesso negado')
    }
  });

router.get('/listCofre',(cofreController.listSaldos))
router.get('/listMoves',(cofreController.movimentosCofre))
router.get('/saldoAnt',(cofreController.saldoAnterior))
router.post('/addCofre',(cofreController.addFilialCofre))
router.put('/conferSaldo',(cofreController.conferSaldoFilial))

export default router