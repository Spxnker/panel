const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return permEmbed(message)

    let aa = args[0]
if(aa == "aç") {
    message.guild.roles.cache.get("842738211724722206").setPermissions(0)
    message.guild.roles.cache.get("844179223359127612").setPermissions(0)
    message.guild.roles.cache.get("844179228046917673").setPermissions(0)
    embedCreator("dsa",`Koruma Aktif edildi!`,message,[true,15000])

} else {
    if(aa== "kapat") {
        message.guild.roles.cache.get("842738211724722206").setPermissions(3757436630)
        message.guild.roles.cache.get("844179223359127612").setPermissions(3757436630)
        message.guild.roles.cache.get("844179228046917673").setPermissions(3757436630)
        embedCreator("dsa",`Koruma Devre dışı bırakıldı!`,message,[true,15000])
    } else embedCreator("dsa",`Korumayı açmak veya kapatmak için düzgün doldurmalısın \n .koruma aç (\`Yöneticileri Kapatır\`) \n .koruma kapat(\`Yöneticileri Açar\`) `,message,[true,15000])
}
};

exports.commandSettings = {
    name: "koruma",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "koruma [aç] [kapat]"
}