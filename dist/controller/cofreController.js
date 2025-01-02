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
exports.cofreController = void 0;
const cofreService_1 = require("../services/cofreService");
class cofreController {
}
exports.cofreController = cofreController;
_a = cofreController;
cofreController.addFilialCofre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, saldo, despesa, deposito, sangria, outras_entradas, movimentos } = req.body;
    const result = yield cofreService_1.FilialServices.addFilialCofre(req.body);
    if (result == true) {
        res.status(201).send({ message: "saldo lançado com sucesso!" });
    }
    else {
        res.status(400).send({ message: "Erro ao lançar saldo! Caso ja exista um saldo do dia atual delete o saldo existente atualize a pagina e tente novamente" });
    }
});
cofreController.DeleteSaldoAtual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nomeSaldo = req.query.nome;
    const result = yield cofreService_1.FilialServices.DeleteSaldoAtual(nomeSaldo);
    if (result == true) {
        res.status(201).send({ message: "saldo Deletado com sucesso!" });
    }
    else {
        res.status(400).send({ message: "Erro ao deletar saldo! não ha saldo lançado hoje" });
    }
});
cofreController.conferSaldoFilial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, id } = req.body;
    yield cofreService_1.FilialServices.statusFilialCofre(req.body.status, req.body.id);
    res.status(201).send({ message: "saldo atualizado com sucesso!" });
});
cofreController.saldoAnterior = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nome = req.query.nome;
    const listFiliais = yield cofreService_1.FilialServices.filterFilialAnterior(nome);
    if (listFiliais == false) {
        return res.status(400).json("nenhuma filial existente");
    }
    return res.status(200).json(listFiliais);
});
cofreController.movimentosCofre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const listFiliais = yield cofreService_1.FilialServices.getMovimentos(id);
    if (listFiliais == false) {
        return res.status(400).json("nenhuma filial existente");
    }
    return res.status(200).json(listFiliais);
});
cofreController.listSaldos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data_evento = req.query.data_evento;
    const nome = req.query.nome;
    if (data_evento) {
        const listFiliais = yield cofreService_1.FilialServices.filterFiliaisData(data_evento);
        if (listFiliais == false) {
            return res.status(400).json("nenhuma filial existente");
        }
        return res.status(200).json(listFiliais);
    }
    else if (nome) {
        const listFiliais = yield cofreService_1.FilialServices.filterFiliaisNome(nome);
        if (listFiliais == false) {
            return res.status(400).json("nenhuma filial existente");
        }
        return res.status(200).json(listFiliais);
    }
    else {
        const listFiliais = yield cofreService_1.FilialServices.listFiliais();
        if (listFiliais == false) {
            return res.status(400).json("nenhuma filial existente");
        }
        return res.status(200).json(listFiliais);
    }
});
