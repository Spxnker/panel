const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator,permEmbed, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return permEmbed(message)

    const everyone = message.guild.roles.cache.find((a) => a.name === "@everyone");
let type = args[0]
if(!type) return trueEmbed(message,this.commandSettings.description)
if(["aç","ac","kilitac"].some(x => type.includes(x))) {
    message.channel.updateOverwrite(everyone.id, {
        SEND_MESSAGES: true
    }).catch(err => message.channel.send(`  Kanal kilidi **açılırken** bir sorun yaşandı. | Hata kodu: ${err}`));
    message.channel.send(`🔓 Kanal kilidi başarıyla **açıldı**!`); 
    message.react(ayarlar.emojiler.onay)
}
if(["kapat","kilitle","kilit"].some(x => type.includes(x))) {
    message.channel.updateOverwrite(everyone.id, {
        SEND_MESSAGES: false
    }).catch(err => message.channel.send(`  Kanal **kilitlenirken** bir sorun yaşandı. | Hata kodu: ${err}`));
    message.channel.send(`🔒 Kanal başarıyla **kilitlendi**!`);  
    message.react(ayarlar.emojiler.onay)

}

};

exports.commandSettings = {
    name: "kilit",
    aliases: ["kanalkilit","lock"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "kilit [aç-kapat]"
}