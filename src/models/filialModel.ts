import {pool} from '../connection'
export interface FilialData{
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
    public conferExistCofre = async(data:FilialData):Promise<FilialData[] | false>=>{
        const date = new Date
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam do zero
        const dia = String(date.getDate()).padStart(2, '0');

        const dateAtual = `${ano}-${mes}-${dia}`
        
        const [rows] = await (await pool).query(
            'SELECT * FROM filial WHERE data_evento = ? and nome = ?',
            [dateAtual,data.nome]
        );
        const filial = rows as FilialData[]
        
        return filial;
    }
    
    static editFilialCofreBD = async (data: FilialData): Promise<boolean> => {
        try {
            // Cria a query para atualização
            const query = `
                UPDATE filial 
                SET 
                    saldo = ?, 
                    despesa = ?, 
                    deposito = ?, 
                    sangria = ?, 
                    outras_entradas = ?, 
                    movimentos = ?
                WHERE data_evento = ? AND nome =?  
            `;
            const date = new Date
            const ano = date.getFullYear();
            const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam do zero
            const dia = String(date.getDate()).padStart(2, '0');

            const dateAtual = `${ano}-${mes}-${dia}`
            // Executa a atualização no banco de dados
            const [result] = await (await pool).execute(query, [
                data.saldo, 
                data.despesa, 
                data.deposito, 
                data.sangria, 
                data.outras_entradas, 
                data.movimentos, 
                dateAtual,
                data.nome
            ]);

            // Verifica se algum registro foi atualizado
            if ((result as any).affectedRows > 0) {
                // Retorna os dados atualizados com o novo timestamp (data_evento)
                return true
            } 
                return false;
            
        } catch (error) {
            console.error('Erro ao atualizar a filial:', error);
            return false;
        }
    };

    
    static deleteCofreDB = async(data:String):Promise<Boolean>=>{
        const date = new Date
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam do zero
        const dia = String(date.getDate()).padStart(2, '0');

        const dateAtual = `${ano}-${mes}-${dia}`
        const saldoDeleted = await (await pool).query(
            'DELETE FROM filial WHERE data_evento = ? AND nome =? ',
            [dateAtual,data]
        );
        
        if(saldoDeleted){
            return true
        }
        return false
    }
    public addFilialCofreBD = async (data: FilialData): Promise<FilialData> => {
        const date = new Date();
        
        try {
            // Inserindo os dados na tabela 'filial'
            const [result] = await (await pool).execute(
                `INSERT INTO filial (nome, saldo, despesa, deposito, sangria, data_evento, outras_entradas, movimentos)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.nome, 
                    data.saldo, 
                    data.despesa, 
                    data.deposito, 
                    data.sangria, 
                    date, 
                    data.outras_entradas, 
                    data.movimentos
                ]
            );
            
            // O 'result' deve conter o ID gerado ou outras informações de resposta do banco
            const insertedId = (result as any).insertId;
            const fil = {...data,   
                id: insertedId,  
                date: date}
            return {
                ...data,   // Preservando todos os dados recebidos
                id: insertedId,  // Adicionando o ID gerado pelo banco
                date: date,  // Caso precise de data_evento
            };
        } catch (error) {
            console.error('Erro ao adicionar filial ao banco:', error);
            throw new Error('Erro ao adicionar filial ao banco');
        }
    };
    static statusFilialCofreBD = async(status:string, id:number):Promise<boolean>=>{
        try {
            const query = (await pool).execute(`UPDATE filial SET status = ? WHERE id = ?`,[status,id])
            return true
        }catch(error){
            console.error('Erro ao executar a consulta:', error);
            return false
        }
    }
    static getMovimentosDB= async(id:any):Promise<FilialData[] | false>=>{
        const [rows] = await (await pool).query(
            'SELECT movimentos FROM filial WHERE id = ?',
            [id]
        );
        const filial = rows as FilialData[]
        return filial;
    }
    static getMovimentosAtualDB= async(nome:string):Promise<FilialData[] | false>=>{
        function formatarData(data:Date) {
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mes começa em 0, por isso adiciona 1
            const dia = data.getDate().toString().padStart(2, '0');
        
            return `${ano}-${mes}-${dia}`;
        }
        
        const dataAtual = new Date();
        const dataFormatada = formatarData(dataAtual);
        const [rows] = await (await pool).query(
            'SELECT movimentos FROM filial WHERE data_evento = ? AND nome =?',
            [dataFormatada,nome]
        );
        const filial = rows as FilialData[]
        return filial;
    }
    static getLastMovimentosDB= async(name:string):Promise<FilialData[] | false>=>{
        const [rows] = await (await pool).query(
            'SELECT movimentos ,data_evento FROM filial WHERE nome = ? ORDER BY id DESC LIMIT 1;',
            [name]
        );
        const filial = rows as FilialData[]
        const result = rows as { movimentos: JSON, data_evento: Date }[];
        const filiaDate = result.map((row: any) => ({
            data_evento: row.data_evento,
        }))
        function formatarData(data:Date) {
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mes começa em 0, por isso adiciona 1
            const dia = data.getDate().toString().padStart(2, '0');
        
            return `${ano}-${mes}-${dia}`;
        }
        
        const dataAtual = new Date();
        const dataFormatadaAtual = formatarData(dataAtual);
        const dataFormatadaBD = formatarData(filiaDate[0].data_evento)
        if(dataFormatadaBD != dataFormatadaAtual){
            return filial;
        }else{
            const [rows] = await (await pool).query(
                `SELECT movimentos FROM filial WHERE nome = ? AND id < (SELECT MAX(id) FROM filial WHERE nome = ?) 
        ORDER BY id DESC 
        LIMIT 1;`,
        [name, name]
            );
            const filial = rows as FilialData[]
            return filial;
        }
    }
    static filterFiliaisNomeBD = async (data:string):Promise<FilialData[] | false>=>{
            // Começa com a consulta base
            let query = 'SELECT * FROM filial WHERE 1=1 ';
            const queryParams: (string | undefined)[] = [];

              query += 'and nome = ?';
              queryParams.push(data);
              
          
            // Executa a consulta com os parâmetros
            const [rows] = await (await pool).query(query, queryParams);
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
        const [rows] = await (await pool).query(query, queryParams);
        const filial = rows as FilialData[]
        return filial;
    };
    static filterFilialAnteriorDB = async (nome:String): Promise<FilialData[] | false> => {
          const [rows] = await (await pool).query(
            'SELECT saldo , data_evento FROM filial WHERE nome = ? ORDER BY id DESC LIMIT 1; ',
            [nome]
        );
        const filial = rows as FilialData[]
        const result = rows as { saldo: number, data_evento: Date }[];
        const filiaDate = result.map((row: any) => ({
            data_evento: row.data_evento,
        }))
        function formatarData(data:Date) {
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mes começa em 0, por isso adiciona 1
            const dia = data.getDate().toString().padStart(2, '0');
        
            return `${ano}-${mes}-${dia}`;
        }
        
        const dataAtual = new Date();
        const dataFormatadaAtual = formatarData(dataAtual);
        const dataFormatadaBD = formatarData(filiaDate[0].data_evento)
        if(dataFormatadaBD != dataFormatadaAtual){
            return filial;
        }else{
            const [rows] = await (await pool).query(
                `SELECT saldo, data_evento FROM filial WHERE nome = ? AND id < (SELECT MAX(id) FROM filial WHERE nome = ?) 
        ORDER BY id DESC 
        LIMIT 1;`,
        [nome, nome]
            );
            const filial = rows as FilialData[]
            return filial;
        }
        
    };
    static listFiliaisBD = async ():Promise<FilialData[] | false>=>{
        const [rows] = await (await pool).query('SELECT * FROM filial')
        const filial = rows as FilialData[]
        if((filial as any[]).length == 0){
            return false
        }
        return filial
    }
}