const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const botMenuService = require('./services/botMenuService');
const lastMatchService = require('./services/lastMatchService');
const nextMatchService = require('./services/nextMatchService');
const chatGptService = require('./services/chatGptService');

const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.0.html',
    }
});

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (message) => {
    const botMenuMessage = botMenuService.checkIfMessageRequestsBotMenu(message.body);
    if(botMenuMessage){
        message.reply(botMenuMessage);
    }
    
    const lastMatchMessage = await lastMatchService.checkIfMessageRequestsLastMatch(message.body);
    if(lastMatchMessage){
        message.reply(lastMatchMessage);
    }

    const nextMatchMessage = await nextMatchService.checkIfMessageRequestsNextMatch(message.body);
    if(nextMatchMessage){
        message.reply(nextMatchMessage)
    }

    const askQuestionIAMessage = await chatGptService.checkIfMessageRequestsAskQuestionsIA(message.body);
    if(askQuestionIAMessage){
        message.reply(askQuestionIAMessage)
    }
});

client.initialize();