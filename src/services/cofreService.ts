import { FilialModel, FilialData} from '../models/filialModel'
export class FilialServices{
    static addFilialCofre = async(data:FilialModel):Promise<boolean | FilialData>=>{
        const filial = new FilialModel(data.nome, data.saldo,data.despesa,data.deposito,data.sangria, data.outras_entradas,data.movimentos)
        const conferExist = await filial.conferExistCofre(filial)
        if(filial.conferDataFilial(filial)==true){ 
            if(conferExist ==false){
                 await filial.addFilialCofreBD(filial)
                return true 
            }else{ 
                await FilialModel.editFilialCofreBD(filial)
                return true
            } 
            
        }return false 
    }
    static DeleteSaldoAtual= async(nome:String):Promise<Boolean>=>{
        const saldoDeleted = await FilialModel.deleteCofreDB(nome)
        
        if(saldoDeleted){
            return true
        }
            return false
        
    }
    static  statusFilialCofre= async(status:boolean,id:number):Promise<void>=>{
        if(status === true){
            await FilialModel.statusFilialCofreBD('conferido',id)
        }else{
            await FilialModel.statusFilialCofreBD('pendente',id)
        }
    }
    static listFiliais = async():Promise<FilialModel[] | false>=>{
        const listFiliais = await FilialModel.listFiliaisBD()
        if(listFiliais != false){
            return listFiliais as FilialModel[] | false
        }return false
    }
    static filterFiliaisData = async (data_evento: string): Promise<FilialModel[] | false> => {
        if (data_evento) {
            const listFiliais = await FilialModel.filterFiliaisDataBD(data_evento);
            
            if (listFiliais !== false) {
                return listFiliais as FilialModel[] | false;
            }
            return false;
        }
        return false;
    };
    static filterFilialAnterior = async (nome: string): Promise<FilialModel[] | false> => {
        
            const listFiliais = await FilialModel.filterFilialAnteriorDB(nome);
            
            if (listFiliais !== false) {
                return listFiliais as FilialModel[] ;
            }
            return false;
    };
    static getMovimentos = async (id: any): Promise<FilialModel[] | false> => {
        
        const listFiliais = await FilialModel.getMovimentosDB(id);
        
        if (listFiliais !== false) {
            return listFiliais as FilialModel[] ;
        }
        return false;
    };
    static getMovimentoAtuais = async (nome:string): Promise<FilialModel[] | false> => {
        
        const listFiliais = await FilialModel.getMovimentosAtualDB(nome);
        
        if (listFiliais !== false) {
            return listFiliais as FilialModel[] ;
        }
        return false;
    };
    static getLastMovimentos = async (name:string): Promise<FilialModel[] | false> => {
        
        const listFiliais = await FilialModel.getLastMovimentosDB(name);
        
        if (listFiliais !== false) {
            return listFiliais as FilialModel[] ;
        }
        return false;
    };
    static filterFiliaisNome = async (nome: string): Promise<FilialModel[] | false> => {
        if (nome) {
            const listFiliais = await FilialModel.filterFiliaisNomeBD(nome);
            
            if (listFiliais !== false) {
                return listFiliais as FilialModel[] | false;
            }
            return false;
        }
        return false;
    };
}