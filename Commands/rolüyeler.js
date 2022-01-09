const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const victim = require('../Models/regModel.js');
exports.run = async(client, message, args,author, victim) => {


    if (!message.member.hasPermission('ADMINISTRATOR') && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if (!rol) return message.reply('Bir rol ID belirtmelisin.')

    let roluyeler = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol.id)).size

    message.channel.send(`
    ● <@&${rol.id}> \`(${rol.id})\` rol bilgileri;
    ● Rol rengi: \`${message.guild.roles.cache.get(rol.id).hexColor}\` 
    ● Rol kişi sayısı: \`${roluyeler}\`
    ─────────────────
    ● Roldeki kişiler:
    ${message.guild.roles.cache.get(rol.id).members.map(m=> m .toString()+ " - " + "("+m.id+")").join("\n")}
    `, { split: true }).catch(err => message.channel.send(`Bir hata oluştu. | Hata kodu: ${err}`));


};


exports.commandSettings = {
    name: "rolüyeler",
    aliases: ["rol","roluyeler"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "rolüyeler [ROL ID]"
}