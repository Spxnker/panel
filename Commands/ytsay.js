const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    if (!message.member.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let enAltYetkiliRolu = message.guild.roles.cache.get(ayarlar.yetkiliRole.enAltYetkiliRole);
    
      let members = message.guild.members.cache.filter(member => member.roles.highest.position >= enAltYetkiliRolu.position);
      
    
    
    
      let sesteOlmayanlar = members.filter(member =>  !member.voice.channel && !member.user.bot && member.presence.status !== "offline");
    
      message.channel.send(`Aktif olup sesde olmayan yetkili sayısı **${sesteOlmayanlar.size}**\n${sesteOlmayanlar.map(member => `${member}`).join(",")}`, {split: true}).catch(err => message.channel.send(`Bir hata oluştu! | Hata kodu: ${err}`))
    


}

exports.commandSettings = {
    name: "ytsay",
    aliases: ["ysay","yetkilisay"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "ytsay"
}