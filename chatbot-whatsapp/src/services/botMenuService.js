function checkIfMessageRequestsBotMenu(message) {
    if (message === '!bot'){
        return '🤖 *Menu Bot* 🤖\n\n' +
        '⚽️ *Para obter resultado da última partida de futebol:*\n' +
        '!ultima partida fluminense\n' +
        '!ultima partida flamengo\n' +
        '!ultima partida brusque\n\n' +
        '⚽️ *Para obter próximas partidas de futebol:*\n' +
        '!proxima partida fluminense\n' +
        '!proxima partida flamengo\n' +
        '!proxima partida brusque\n\n' +
        '💬 *Para fazer alguma pergunta ao ChatGPT:*\n' +
        '!chatgpt _sua pergunta aqui_';
    }
    return null;
};

module.exports = {
    checkIfMessageRequestsBotMenu
};