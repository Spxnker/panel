const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed, rolAl } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!message.member.roles.cache.has(ayarlar.reg.regHammer) && !message.member.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
if(!victim) return trueEmbed(message,this.commandSettings.description)
    Database.findOne({guildID: message.guild.id, victimID: victim.id}, (err, res) => {
        if(!res) {
embedCreator("dsa",`${victim} kişisinin herhangi bir isim verisi bulunamadı!`,message,[true, 100000])
        } else {
            res = res.nicknames.reverse();
            const History = res.map((e, i) => ` \`${i + 1}.\` \`${e.isimler}\` (${e.rol})`);
        embedCreator("dsa",`
        ${victim} Kullanıcısının aşağıda sunucuda olduğu tüm kayıtlı isimleri listelenmiştir!
        
        ${History.join("\n")}
        
        `,message,[true, 60000])
        
        }
        
        })



};

exports.commandSettings = {
    name: "isimler",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "isimler @Shinoa/461212138346905600"
}