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
exports.FilialServices = void 0;
const filialModel_1 = require("../models/filialModel");
class FilialServices {
}
exports.FilialServices = FilialServices;
_a = FilialServices;
FilialServices.addFilialCofre = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const filial = new filialModel_1.FilialModel(data.nome, data.saldo, data.despesa, data.deposito, data.sangria, data.outras_entradas, data.movimentos);
    const conferExist = yield filial.conferExistCofre(filial);
    if (filial.conferDataFilial(filial) == true) {
        if (conferExist != false) {
            return false;
        }
        else {
            yield filial.addFilialCofreBD(filial);
            return true;
        }
    }
    return false;
});
FilialServices.DeleteSaldoAtual = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const saldoDeleted = yield filialModel_1.FilialModel.deleteCofreDB(nome);
    if (saldoDeleted) {
        return true;
    }
    return false;
});
FilialServices.statusFilialCofre = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === true) {
        yield filialModel_1.FilialModel.statusFilialCofreBD('conferido', id);
    }
    else {
        yield filialModel_1.FilialModel.statusFilialCofreBD('pendente', id);
    }
});
FilialServices.listFiliais = () => __awaiter(void 0, void 0, void 0, function* () {
    const listFiliais = yield filialModel_1.FilialModel.listFiliaisBD();
    if (listFiliais != false) {
        return listFiliais;
    }
    return false;
});
FilialServices.filterFiliaisData = (data_evento) => __awaiter(void 0, void 0, void 0, function* () {
    if (data_evento) {
        const listFiliais = yield filialModel_1.FilialModel.filterFiliaisDataBD(data_evento);
        if (listFiliais !== false) {
            return listFiliais;
        }
        return false;
    }
    return false;
});
FilialServices.filterFilialAnterior = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const listFiliais = yield filialModel_1.FilialModel.filterFilialAnteriorDB(nome);
    if (listFiliais !== false) {
        return listFiliais;
    }
    return false;
});
FilialServices.getMovimentos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listFiliais = yield filialModel_1.FilialModel.getMovimentosDB(id);
    if (listFiliais !== false) {
        return listFiliais;
    }
    return false;
});
FilialServices.filterFiliaisNome = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    if (nome) {
        const listFiliais = yield filialModel_1.FilialModel.filterFiliaisNomeBD(nome);
        if (listFiliais !== false) {
            return listFiliais;
        }
        return false;
    }
    return false;
});
