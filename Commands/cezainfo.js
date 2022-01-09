const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed } = require('../functions');
exports.run = async(client, message, args,author, victim) => {

    if(!author.roles.cache.has(ayarlar.guildHammer.banHammer) && !author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let sayi = args[0]
    if(!Number(sayi) && !sayi) return trueEmbed(message,this.commandSettings.description)

    Database.findOne({guildID: message.guild.id,cezaID: sayi }, async (err, ceza) => {
        if(ceza) {
embedCreator("#4D0A0A", `
**Cezabilgi ${args[0]} Bilgilendirmesi**

**● Cezalanan Kişi:** <@${ceza.victimID}>
**● Cezayı Veren Kişi:** <@${ceza.execID}>
**● Türü:** \`${ceza.Type}\`
**● Sebebi:** \`${ceza.Reason}\`
**● Başlangıç Tarihi:** \`${client.toDate(ceza.dateNow)}\`
**● Bitiş Tarihi:** \`${client.toDate(ceza.finishDate)}\`
`
,message,[false])
    } else {
        embedCreator("#4D0A0A", `Belirtilen ID li ceza bulunamadı!`,message,[true, 5000])}
    }) 

 };




exports.commandSettings = {
    name: "cezainfo",
    aliases: ["ceza-info","cezasorgu"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "cezainfo [CEZA ID]"
}