const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const victim = require('../Models/regModel.js');
const kayit = require('../Models/cezaKayit.js')
exports.run = async(client, message, args,author, victim) => {

    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    if(!victim) return trueEmbed(message, this.commandSettings.description)
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp().setFooter(ayarlar.botSettings.setFooter)
    
 kayit.findOne({guildID: message.guild.id,execID: victim.id},async (err, res) => {
    let text 
    if(!res) {

        embedCreator("dsa",`

        Merhaba \`${author.displayName}\` şu anda ${victim} kişisinin profiline bakmaktasın!
        
           \`⦁\` **${victim} Kişisinin bilgileri**
        \`-\` **Tam Adı** \`${victim.user.tag}\`
        \`-\` **Oluşturulma Bilgisi** \`${moment(victim.user.createdAt).format("DD/MM/YY HH:mm:ss")}\`
        
        \`⦁\` **${victim} Kişisinin ceza bilgileri!**
Kişinin ceza bilgisi bulunamadı!
   
        **Rolleri** ${victim.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${victim.roles.cache.size})` : victim.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
        `,message,[false])
   

return
    }

    let ban = Number(res.Ban || 0)
    let jail = Number(res.Jail || 0)
    let vmute = Number(res.Vmute || 0)
    let mute = Number(res.Mute || 0)
    let total = Number(mute) + Number(vmute) + Number(jail) +  Number(ban)
    
     text = `Toplamda \`${total}\` kadar ceza almış Bunlardan;
    
    \`${jail}\` tanesi **jail**, \`${ban}\` tanesi **ban**, \`${mute}\` tanesi **mute**, \`${vmute}\` tanesi ise **ses** cezasıdır!
     `
    
     embedCreator("dsa",`

     Merhaba \`${author.displayName}\` şu anda ${victim} kişisinin profiline bakmaktasın!
     
        \`⦁\` **${victim} Kişisinin bilgileri**
     \`-\` **Tam Adı** \`${victim.user.tag}\`
     \`-\` **Oluşturulma Bilgisi** \`${moment(victim.user.createdAt).format("DD/MM/YY HH:mm:ss")}\`
     
     \`⦁\` **${victim} Kişisinin ceza bilgileri!**
     Toplamda \`${total}\` kadar ceza almış Bunlardan;
     
     \`${jail}\` tanesi **jail**, \`${ban}\` tanesi **ban**, \`${mute}\` tanesi **mute**, \`${vmute}\` tanesi ise **ses** cezasıdır!

     **Rolleri** ${victim.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${victim.roles.cache.size})` : victim.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
     `,message,[false])




})





    
}


exports.commandSettings = {
    name: "profil",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "profil @Shinoa/461212138346905600"
}