const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed, logEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!author.roles.cache.has(ayarlar.guildHammer.banHammer) && !author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let logKanal = client.channels.cache.get(ayarlar.guildLogs.banLogs)
    if (!args[0] || isNaN(args[0])) return trueEmbed(message,this.commandSettings.description)
    let kisi = await client.users.fetch(args[0]);



    try {
        message.guild.members.unban(kisi.id)
    } catch (err) {
        console.log(err)
        message.react(ayarlar.emojiler.red)
        return embedCreator("#DSADSA",`Belirtilen ID numarasına sahip ban bulunamadı!`,message,[true, 10000])

    }
    if(logKanal)         logEmbed(logKanal,` ${kisi.tag} üyesinin yasağı ${author} tarafından kaldırıldı `,message,[false])
    embedCreator("#BLABLA",`  Belirtilen üyenin yasaklaması başarılı bir şekilde kaldırıldı `,message,[true, 10000])
    message.react(ayarlar.emojiler.onay)


 };

exports.commandSettings = { 
    name: "unban",
    aliases: ["bankaldır","ban-kaldır"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "unban 461212138346905600 [Sebep]"
}