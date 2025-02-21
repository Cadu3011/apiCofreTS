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
const { chromium } = require('playwright');
function loginAndGetReport() {
    return __awaiter(this, void 0, void 0, function* () {
        // Lançar o navegador com Playwright em modo headless
        const browser = yield chromium.launch({
            headless: true, // Defina como 'true' para não mostrar a interface
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        // Criar uma nova página
        const page = yield browser.newPage();
        // Interceptar requisições e abortar as que não forem necessárias (imagens, fontes, etc.)
        yield page.route('**/*', (route, request) => {
            if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                route.abort(); // Aborta o carregamento de imagens, fontes e folhas de estilo
            }
            else {
                route.continue(); // Deixa as outras requisições passarem
            }
        });
        // Acessa a página de login
        yield page.goto('http://192.168.1.253:4647/sgfpod1/Login.pod', { waitUntil: 'domcontentloaded' });
        // Preenche o campo de nome de usuário e senha
        yield page.fill('#id_cod_usuario', '95');
        yield page.fill('#nom_senha', 'cadu3011');
        // Clica no botão de login
        yield page.click('#login');
        yield page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const token = yield page.evaluate(() => {
            return localStorage.getItem('token_integracao');
        });
        yield browser.close();
        return token;
    });
}
