/* Codded by Phaticusthiccy
Unlimited API for Photooxy, Textpro and Instagram scraper.
Material: https://www.npmjs.com/package/textmaker-thiccy
Github: https://github.com/phaticusthiccy/TextMaker-Unlimited
This code works with unlimited and completely free an API scraper.
Don't use it for illegal purposes.
*/

const thiccysapi = require('ephoto-360'); // Import NPM Package

const Asena = require('../events');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const axios = require('axios')
const request = require('request');
const os = require('os');
var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')
clh.pay = ddd
var desc_msg = ''
if (Config.LANG == 'TR') desc_msg = 'Sınırsız erişime sahip textmaker araçlarını gösterir.'
if (Config.LANG == 'EN') desc_msg = 'Shows text to image tools with unlimited access.'
if (Config.LANG == 'RU') desc_msg = 'Показывает инструменты для создания текстов с неограниченным доступом.'
if (Config.LANG == 'AZ') desc_msg = 'Sınırsız girişi olan textmaker alətləri göstərir.'
if (Config.LANG == 'PT') desc_msg = 'Mostra ferramentas textmaker com acesso ilimitado.'
if (Config.LANG == 'ID') desc_msg = 'Menampilkan alat pembuat teks dengan akses tak terbatas.'
if (Config.LANG == 'ML') desc_msg = 'പരിധിയില്ലാത്ത ആക്സസ് ഉള്ള ടെക്സ്റ്റ് മേക്കർ ഉപകരണങ്ങൾ കാണിക്കുന്നു.'
if (Config.LANG == 'HI') desc_msg = 'असीमित एक्सेस के साथ टेक्स्टमेकर टूल दिखाता है।'
if (Config.LANG == 'ES') desc_msg = 'Muestra herramientas de creación de textos con acceso ilimitado.'
if (os.userInfo().homedir !== clh.pay) return;
let wk = Config.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'txtit2$', fromMe: wk, desc: desc_msg}, (async (message, match) => {
    var t1 = ''
    if (Config.LANG == 'TR' || Config.LANG == 'AZ') {
        t1 = 'Şeytan Temalı Logo Yapar.' // https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html
    }
    else {
        t1 = 'Makes Cap America Themed Logo.' // https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html  
    }
    var usage_cmd = ''
    var command_cmd = ''
    var desc_cmd = ''
    if (Config.LANG == 'TR' || Config.LANG == 'AZ') {
        usage_cmd = '⌨️ *Örnek:* _'
        command_cmd = '💻 *Komut:* '
        desc_cmd = 'ℹ️ *Açıklama:* _'
    } else { 
        usage_cmd = '*🔖 Example:* '
        command_cmd = '❣️ *Command:* '
        desc_cmd = '💝 *Description:* '
    }
    const msg = command_cmd + '```.camerica``` \n' + t1 + '_\n' + usage_cmd + '.camaerica doc;editor\n\n' +
        command_cmd + '```.3marvel``` \n' + desc_cmd + t2 + '_\n' + usage_cmd + '.3marvel doc;editor'   
    await message.client.sendMessage(message.jid,msg, MessageType.text, { quoted: message.data })
}));    
Asena.addCommand({pattern: 'camerica ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = '';
    }
    thiccysapi.ephoto("https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html",
        [`${topText}`, `${bottomText}`]
        ).then(async (data) => { 
          try { 
              var download = async(uri, filename, callback) => {
                  await request.head(uri, async(err, res, body) => {    
                      await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                  });
              };

              await download(`${data}`, '/root/WhatsAsenaDuplicated/came.jpg', async() => {                          
                  await message.client.sendMessage(message.jid,fs.readFileSync('/root/WhatsAsenaDuplicated/came.jpg'), MessageType.image, { caption: Config.AFN })
              })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
