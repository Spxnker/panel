const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
 const sure = args[0]
 const sebep = args.slice()
 if(!sure || !ms(sure)) return trueEmbed(message,this.commandSettings.description)
 let reason = args.splice(1).join(" ");
if(!reason) reason = "Belirtilmedi!"
let yaziSure = sure.replace("h", " Saat").replace("m", " Dakika").replace("d", " Gün").replace("s", " Saniye");

message.channel.send(`\`${reason}\` Sebebiyle alarm kuruldu! **${yaziSure}** sonra alarmın çalıcak! `)

setTimeout(() => {
    message.channel.send(`${message.author} | \`${reason}\` Sebebi ile kurduğun alarmın zamanı doldu! `)
}, ms(sure));
};

exports.commandSettings = {
    name: "alarm",
    aliases: ["alarm-kur"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "alarm [Süre]"
}