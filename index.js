
const TelegramApi = require('node-telegram-bot-api')

const token = '5084086369:AAHz-bdE5ml7BnUmD0GT316L9sVz0LkHk3g'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command:'/start', description:'Начальное приветсвие'},
    {command:'/info', description:'получить информацию  о пользователе'}
])


const start = () => {
    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
            if (text === '/start') {
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/a17/e12/a17e1254-469f-4e2d-93f2-ff93761e7b72/1.webp')            
                return bot.sendMessage(chatId, 'Welcome')            
                
            }
            if (text === '/info') {
                return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)             
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю')       

    })
}

start()