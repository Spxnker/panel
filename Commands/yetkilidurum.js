const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.yetkiliRole.enAltYetkiliRole);
    
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.guild.iconURL({ dynamic: true })).setColor("BLACK");

    
    let yetkililer = message.guild.members.cache.filter(uye => uye.roles.highest.position >= enAltYetkiliRolü.position);

    
    message.channel.send(embed.setDescription(`Toplam yetkili sayısı: \`${yetkililer.size}\`\nAktif yetkili sayısı: \`${yetkililer.filter(uye => uye.presence.status !== "offline").size}\`\nSesteki yetkili sayısı: \`${yetkililer.filter(uye => uye.voice.channel).size}\``))
    
    

};

exports.commandSettings = {
    name: "yetkili-durum",
    aliases: ["ydurum","yetkilidurum"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "yetkili-durum"
}