const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator,permEmbed, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    if (!message.member.hasPermission('ADMINISTRATOR') && author.roles.cache.has(ayarlar.guildHammer.banHammer) && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
let id = args[0]
if(!args[0] || isNaN(args[0])) return trueEmbed(message,this.commandSettings.description)


Database.findOne({guildID: message.guild.id, Type: "BAN",victimID: args[0]},async function(err, data) {


    if(data) {

        embedCreator("Sh",`
        \`${id}\`** ID'li son yasaklamasııyla ilgili veritabanında bu bilgileri buldum!**
        
      **  ● Yasaklayan Kişi** <@${data.execID}>
        **● Yasaklama Sebebi** \`${data.Reason}\`
        **● Yasaklama Tarihi** \`${client.toDate(data.dateNow)}\`
        `,message,[true,60000])
    
    
        
    } else {
    
        try {
            message.guild.fetchBan(args.slice(0).join(' ')).then(({ user, reason }) =>        embedCreator("Sh",`
            \`${user.id}\`** ID'li üyenin yasaklaması bir **\`sağ tık\`**yasaklama! Onla ilgili bu bilgileri bulabildim**
            
           ** ● Yasaklama Sebebi** \`${reason? reason: "Belirtilmemiş"}\`
            `,message,[true,60000]))
    
        } catch (err) {
            embedCreator("DSADSA",`Belirtilen ID numarasına sahip bir ban bulunamadı!! `,message,[true, 10000])
        }
    
    
    }

})





};

exports.commandSettings = {
    name: "bansorgu",
    aliases: ["ban-bilgi","ban-sorgu","banbilgi"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ".banbilgi [Kişi ID]"
}