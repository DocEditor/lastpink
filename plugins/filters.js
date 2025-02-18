/* Copyright (C) 2020 farhan-dqz.
re codded by afnanplk
PINKY V2
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const afn = Config.PLKS !== false ? Config.PLKS.split(',') : [];
const jid = Config.DISBGM !== undefined ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919072790587@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['name entha','Helo','King','Kooi','Tuttu','Azaru','Ramos','Tentacion','baby','Love','nirthada','Neymar','umma','Music','Kurup','Friend','Rose','aara','Alone','ayilla','bie','Chiri','colony','enth','entha','Fuck','Goal','Hambada','Kanja','Killedi','kuthirappavan','mathi','Meeting','mier','moonji','Name','Oh no','pever','Potta','Serious','Soldier','Sry','Subscribe','thottu','Va','Vada','vimanam','sorry','nanban','Lala','Smile','ghost','La be','Sed','Uff','Legend','music','Fek','Psycho','Town','Pwoli','Uyir','Malang','Bad','Boss','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','😎','Akshay uyir','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Oompi','oompi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Pinky','Caption','caption','onn poyi','Onn poyi','problem','Problem','lub','recharge','Recharge','Pinky','chill','Chill','help','Help','kunda','Kunda','povano','Povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
    
if (Config.PLKBGM == 'one') {  
    
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919072790587@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/trance.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
        if (!!message.mention && message.mention[0] == Config.AFNN) {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['name entha','Helo','King','Kooi','Love','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Umbi','umbi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Pinky','Caption','caption','onn poyi','Onn poyi','problem','Problem','Chill','chill','help','Help','Kunda','kunda','povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu','Pinkymol','malayalam','Malayalam','vaa','Vaa','bot','lub','Ayin','thyr','Thyr','Sad','sad','Sed','kiss','Kiss','baby','Baby','hi','voice','love','Admin','admin','Remove','remove','boss','sorry','Sorry','Owner','owner','Gud nyt','dream','Dream','Avastha','Bye','bye']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
    if (Config.PLKBGM == 'two') {    
    Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {   
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919072790587@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/trance.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
        if (!!message.mention && message.mention[0] == Config.AFNN) {
await message.client.sendMessage(message.jid, fs.readFileSync('./upload/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['name entha','💥','Helo','King','Kooi','Tuttu','Azaru','Ramos','Tentacion','baby','Love','nirthada','Kaztro','pubg','Neymar','umma','Music','Kurup','Friend','Rose','aara','Alone','ayilla','bie','Chiri','colony','enth','entha','Fuck','Goal','Hambada','Kanja','Killedi','kuthirappavan','mathi','Meeting','mier','moonji','Name','Oh no','pever','Potta','Serious','Soldier','Sry','Subscribe','thottu','Va','Vada','vimanam','sorry','nanban','Lala','Smile','ghost','La be','Sed','Uff','Legend','music','Fek','Psycho','Town','Pwoli','Uyir','Malang','Bad','Boss','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','binMalappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','😎','Akshay uyir','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Oompi','oompi','parayatte','Fresh','patt padu','Blind psycho','Good night','💥','poli','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Pinky','Caption','caption','onn poyi','Onn poyi','problem','Problem','alive','Pubg','Fasil','Omg','Ayn','Noob','Mention','arulle','nanban','💥','subscribe','super','poli','rasamundo','rascal','Good night','Mm','poda','Malik','zatan','Birthday','jaike','Stanly','Paathu','kaztro','aishu','aishwarya','viper','fasil','owner','14243839432','Aliya','Polikam','Vaa aliya','Love you','Biscut','Show','Thee','Jada','Bgm','dead','like you','love u','miss you','Ola','podi','sorry','who are you','chathichu','po','pokalle','pokko','see you again','Ara ath','odiko','Umbi','chellakutti','eni enna','kuku','zed','afraid','Eva','puthiyoru pathayil','Thyr','Bgmi','Oru manam','Chadi chill']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./upload/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.STICKERP){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '15862077024@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/mention.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['Mm','sed','mention','paathu','welcome','ചോദിക്കും','poda myre','Stanly','eid mubarak','mess','umma','zatan','ambada','mathi','Welcome','Paathu','viper','Name','eh','Bc','panni','Happy','good night','Ok bei','Dance','oh','Hi','ask you','Poda','Hlo','ayyo','chirikk','eatha','Bot','Who are you','Chatho','Negative','Love you','Fuck','Wow','Biscut','dead','love you','kuku','chellakutti','eni enna','aara','Fuck','subscribe']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
     async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
 
     Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {

        if(Config.THERI_KICK){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        
const array = afn 
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
    await message.client.sendMessage(message.jid,'you used a bad word that we dont allow here \n -admin panal ', MessageType.text, {quoted: message.data });  
    await message.client.groupRemove(message.jid, [message.data.participant]);                
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));

}
