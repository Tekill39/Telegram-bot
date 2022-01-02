
const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const chats = {}

const token = '5084086369:AAHz-bdE5ml7BnUmD0GT316L9sVz0LkHk3g'

const bot = new TelegramApi(token, {polling: true})
const start = () => {

    bot.setMyCommands([
        {command:'/start', description:'Начальное приветсвие'},
        {command:'/info', description:'Получить информацию  о пользователе'},
        {command:'/game', description:'Игра угадай число'}
    ])

    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/a17/e12/a17e1254-469f-4e2d-93f2-ff93761e7b72/1.webp')            
            return bot.sendMessage(chatId, 'Welcome')           
        }
        
        const startGame = async (chatId) => {
            await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9. Поробуй отгадать число`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;                
            await bot.sendMessage(chatId, 'Отгадывай', gameOptions)      
        }
        
           
            if (text === '/info') {
                return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)             
            }
            if (text === '/game') {
                startGame(chatId)          
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю')     
    })
    bot.on('callback_query',  async msg=> {
        const data = msg.data;        
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]} `, againOptions);
        } else {
            return bot.sendMessage(chatId, `к сожалению ты не угадал цифру ${chats[chatId]} `, againOptions);
        }        
    })
}

start()