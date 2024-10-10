import { Request, Response } from "express";
import { FilialServices } from "../services/cofreService";
    export class cofreController{
        static addFilialCofre = async(req: Request, res: Response):Promise<void>=>{
            const {nome, saldo, despesa, deposito, sangria, outras_entradas,movimentos} = req.body;
           
             const result = await FilialServices.addFilialCofre(req.body)
            if(result == true){
                res.status(201).send({message: "saldo lançado com sucesso!"});
            }else{
                res.status(400).send({message: "Erro ao lançar saldo!"});
            }
        }
        static conferSaldoFilial = async(req: Request, res: Response):Promise<void>=>{
            const {status, id} = req.body
            await FilialServices.statusFilialCofre(req.body.status,req.body.id)
            res.status(201).send({message: "saldo atualizado com sucesso!"});
        }
        static saldoAnterior = async(req: Request, res: Response):Promise<any>=>{
            const nome = req.query.nome as string;
            const listFiliais = await FilialServices.filterFilialAnterior(nome)
               
                if(listFiliais == false){
                    return res.status(400).json("nenhuma filial existente")
                }return res.status(200).json(listFiliais)
        }
        static movimentosCofre = async(req: Request, res: Response):Promise<any>=>{
            const id = req.query.id
            const listFiliais = await FilialServices.getMovimentos(id)
               
                if(listFiliais == false){
                    return res.status(400).json("nenhuma filial existente")
                }return res.status(200).json(listFiliais)
        }
        static listSaldos = async(req: Request, res: Response):Promise<any>=>{
            const data_evento = req.query.data_evento as string;
            const nome = req.query.nome as string;
            if(data_evento){
                const listFiliais = await FilialServices.filterFiliaisData(data_evento)
               
                if(listFiliais == false){
                    return res.status(400).json("nenhuma filial existente")
                }return res.status(200).json(listFiliais)
                
            }else if(nome){
                const listFiliais = await FilialServices.filterFiliaisNome(nome)
                if(listFiliais == false){
                    return res.status(400).json("nenhuma filial existente")
                }return res.status(200).json(listFiliais)
            }
            else{const listFiliais = await FilialServices.listFiliais()
                if(listFiliais == false){
                    return res.status(400).json("nenhuma filial existente")
                }return res.status(200).json(listFiliais)
            }   
        }
            
}