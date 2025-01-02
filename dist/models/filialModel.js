"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilialModel = void 0;
const connection_1 = require("../connection");
class FilialModel {
    constructor(nome, saldo, despesa, deposito, sangria, outras_entradas, movimentos, status, id, date) {
        this.conferExistCofre = (data) => __awaiter(this, void 0, void 0, function* () {
            const date = new Date;
            const ano = date.getFullYear();
            const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam do zero
            const dia = String(date.getDate()).padStart(2, '0');
            const dateAtual = `${ano}-${mes}-${dia}`;
            const [rows] = yield connection_1.pool.query('SELECT * FROM filial WHERE data_evento = ? and nome = ?', [dateAtual, data.nome]);
            const filial = rows;
            return filial;
        });
        this.addFilialCofreBD = (data) => __awaiter(this, void 0, void 0, function* () {
            const date = new Date;
            const query = connection_1.pool.execute(`INSERT INTO filial (nome, saldo, despesa, deposito,sangria, data_evento, outras_entradas,movimentos) values (?,?,?,?,?,?,?,?)`, [data.nome, data.saldo, data.despesa, data.deposito, data.sangria, date, data.outras_entradas, data.movimentos]);
        });
        this.id = id;
        this.nome = nome;
        this.saldo = saldo;
        this.despesa = despesa;
        this.deposito = deposito;
        this.date = date;
        this.sangria = sangria;
        this.outras_entradas = outras_entradas;
        this.movimentos = movimentos;
        this.status = status;
    }
    conferDataFilial(data) {
        if (typeof data.nome == 'string' && data.nome != '' &&
            typeof data.saldo == 'number' &&
            typeof data.despesa == 'number' &&
            typeof data.deposito == 'number' &&
            typeof data.deposito == 'number' &&
            typeof data.outras_entradas == 'number') {
            return true;
        }
        return false;
    }
}
exports.FilialModel = FilialModel;
_a = FilialModel;
FilialModel.deleteCofreDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date;
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam do zero
    const dia = String(date.getDate()).padStart(2, '0');
    const dateAtual = `${ano}-${mes}-${dia}`;
    const saldoDeleted = yield connection_1.pool.query('DELETE FROM filial WHERE data_evento = ? AND nome =? ', [dateAtual, data]);
    if (saldoDeleted) {
        return true;
    }
    return false;
});
FilialModel.statusFilialCofreBD = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = connection_1.pool.execute(`UPDATE filial SET status = ? WHERE id = ?`, [status, id]);
        return true;
    }
    catch (error) {
        console.error('Erro ao executar a consulta:', error);
        return false;
    }
});
FilialModel.getMovimentosDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.pool.query('SELECT movimentos FROM filial WHERE id = ?', [id]);
    const filial = rows;
    return filial;
});
FilialModel.filterFiliaisNomeBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Começa com a consulta base
    let query = 'SELECT * FROM filial WHERE 1=1 ';
    const queryParams = [];
    query += 'and nome = ?';
    queryParams.push(data);
    // Executa a consulta com os parâmetros
    const [rows] = yield connection_1.pool.query(query, queryParams);
    const filial = rows;
    return filial;
});
FilialModel.filterFiliaisDataBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Começa com a consulta base
    let query = 'SELECT * FROM filial WHERE 1=1 ';
    const queryParams = [];
    query += 'and data_evento = ?';
    queryParams.push(data);
    // Executa a consulta com os parâmetros
    const [rows] = yield connection_1.pool.query(query, queryParams);
    const filial = rows;
    return filial;
});
FilialModel.filterFilialAnteriorDB = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.pool.query('SELECT saldo , data_evento FROM filial WHERE nome = ? ORDER BY id DESC LIMIT 1; ', [nome]);
    const filial = rows;
    return filial;
});
FilialModel.listFiliaisBD = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.pool.query('SELECT * FROM filial');
    const filial = rows;
    if (filial.length == 0) {
        return false;
    }
    return filial;
});
