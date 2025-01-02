const { chromium } = require('playwright');

async function loginAndGetReport():Promise<any>{
    // Lançar o navegador com Playwright em modo headless
    const browser = await chromium.launch({
        headless: true,  // Defina como 'true' para não mostrar a interface
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Criar uma nova página
    const page = await browser.newPage();

    // Interceptar requisições e abortar as que não forem necessárias (imagens, fontes, etc.)
    await page.route('**/*', (route:any, request:any) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
            route.abort(); // Aborta o carregamento de imagens, fontes e folhas de estilo
        } else {
            route.continue();  // Deixa as outras requisições passarem
        }
    });

    // Acessa a página de login
    await page.goto('http://192.168.1.253:4647/sgfpod1/Login.pod', { waitUntil: 'domcontentloaded' });

    // Preenche o campo de nome de usuário e senha
    await page.fill('#id_cod_usuario', '95');
    await page.fill('#nom_senha', 'cadu3011');

    // Clica no botão de login
    await page.click('#login');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    const token = await page.evaluate(() => {
        return localStorage.getItem('token_integracao');
    });
    await browser.close();
    return token
}