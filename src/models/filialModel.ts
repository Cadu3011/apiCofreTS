import {pool} from '../connection'
interface FilialData{
    id?:number,
    nome:string,
    saldo:number,
    despesa:number,
    deposito:number,
    sangria:number,
    outras_entradas:number,
    movimentos:JSON
    status?:boolean,
    date?:Date

}
export class FilialModel{
    id?:number
    nome:string
    saldo:number
    despesa:number
    deposito:number
    sangria:number
    outras_entradas:number
    movimentos:JSON
    status?:boolean
    date?:Date
    constructor(nome:string, saldo:number, despesa:number, deposito:number,sangria:number,outras_entradas:number, movimentos:JSON,status?:boolean, id?:number ,date?:Date){
        this.id =id
        this.nome = nome;
        this.saldo = saldo
        this.despesa = despesa
        this.deposito = deposito
        this.date = date
        this.sangria = sangria
        this.outras_entradas = outras_entradas
        this.movimentos = movimentos
        this.status= status
    }
    public conferDataFilial(data:FilialData):boolean{
        if(typeof data.nome == 'string' && data.nome != '' && 
            typeof data.saldo == 'number' &&
            typeof data.despesa == 'number' &&
            typeof data.deposito == 'number'&&
            typeof data.deposito == 'number'&&
            typeof data.outras_entradas == 'number'){
            return true
        }return false
    }   
    public addFilialCofreBD = async(data:FilialData):Promise<void>=>{
        const date = new Date
        
        const query = pool.execute(`INSERT INTO filial (nome, saldo, despesa, deposito,sangria, data_evento, outras_entradas,movimentos) values (?,?,?,?,?,?,?,?)`,
            [data.nome, data.saldo, data.despesa, data.deposito,data.sangria, date , data.outras_entradas, data.movimentos])
    }
    static statusFilialCofreBD = async(status:string, id:number):Promise<boolean>=>{
        try {
            const query = pool.execute(`UPDATE filial SET status = ? WHERE id = ?`,[status,id])
            return true
        }catch(error){
            console.error('Erro ao executar a consulta:', error);
            return false
        }
    }
    static getMovimentosDB= async(id:any):Promise<FilialData[] | false>=>{
        const [rows] = await pool.query(
            'SELECT movimentos FROM filial WHERE id = ?',
            [id]
        );
        const filial = rows as FilialData[]
        return filial;
    }
    static filterFiliaisNomeBD = async (data:string):Promise<FilialData[] | false>=>{
            // Começa com a consulta base
            let query = 'SELECT * FROM filial WHERE 1=1 ';
            const queryParams: (string | undefined)[] = [];

              query += 'and nome = ?';
              queryParams.push(data);
              
          
            // Executa a consulta com os parâmetros
            const [rows] = await pool.query(query, queryParams);
            const filial = rows as FilialData[]
            return filial;
    }
    static filterFiliaisDataBD = async (data: string): Promise<FilialData[] | false> => {
        // Começa com a consulta base
        let query = 'SELECT * FROM filial WHERE 1=1 ';
        const queryParams: (string | undefined)[] = [];
        
          query += 'and data_evento = ?';
          queryParams.push(data);
          
      
        // Executa a consulta com os parâmetros
        const [rows] = await pool.query(query, queryParams);
        const filial = rows as FilialData[]
        return filial;
    };
    static filterFilialAnteriorDB = async (nome:String): Promise<FilialData[] | false> => {

          const [rows] = await pool.query(
            'SELECT saldo FROM filial WHERE nome = ? ORDER BY id DESC LIMIT 1; ',
            [nome]
        );
        const filial = rows as FilialData[]
        return filial;
    };
    static listFiliaisBD = async ():Promise<FilialData[] | false>=>{
        const [rows] = await pool.query('SELECT * FROM filial')
        const filial = rows as FilialData[]
        if((filial as any[]).length == 0){
            return false
        }
        return filial
    }
}