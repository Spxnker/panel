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

    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor("RANDOM").setFooter(ayarlar.botSettings.setFooter)

    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!rol) return message.channel.send("Rol ID belirtmelisin.").then(x => x.delete({ timeout: 10000 }))
    let rolsayi = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol.id)).size


    message.channel.send(embed.setDescription(`> <@&${rol.id}> rolünde bulunan üye sayısı \`${rolsayi}\``));


};


exports.commandSettings = {
    name: "rolsorgu",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "rolsorgu [ROL ID]"
}