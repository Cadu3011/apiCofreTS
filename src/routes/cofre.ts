import {Router} from 'express'
import { cofreController } from '../controller/cofreController'

const allowedip = ['::ffff:127.0.0.1','::ffff:177.200.115.10','::ffff:186.194.81.125', '::ffff:177.200.115.1','::ffff:186.194.81.98','::ffff:187.15.19.21','::ffff:187.114.173.39','::ffff:191.30.133.118','::ffff:191.30.129.134']
const router = Router()
router.use((req, res, next) => {
    const ip = req.ip
    console.log('IP do cliente:', ip);
    if(allowedip[0] === ip || ip === '::1' || allowedip[1] === ip || allowedip[2] === ip || allowedip[3] === ip || allowedip[4] === ip || allowedip[5] === ip|| allowedip[6] === ip  || allowedip[7] === ip || allowedip[8] === ip){
      next();
    }else{
      res.status(403).send('acesso negado')
    }
  });
router.get('/deleteSaldoAtual',(cofreController.DeleteSaldoAtual))
router.get('/listCofre',(cofreController.listSaldos))
router.get('/listMoves',(cofreController.movimentosCofre))
router.get('/saldoAnt',(cofreController.saldoAnterior))
router.get('/movsAtual',(cofreController.movimentosAtuaisCofre))
router.get('/movAnterior',(cofreController.movimentoAnteriorCofre))
router.post('/addCofre',(cofreController.addFilialCofre))
router.put('/conferSaldo',(cofreController.conferSaldoFilial))


export default router