const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
let tag = args[0]
let rol = args[1]

if(!tag) return trueEmbed(message,this.commandSettings.description)
let aaaa = message.guild.roles.cache.get(rol)
if(!aaaa) message.channel.send("Geçerli bir rol belirtmelisin!")
let taggesF = message.guild.members.cache.filter(x => x.user.username.includes(tag)).forEach(element => {
    element.roles.add(rol)
    message.react(ayarlar.emojiler.onay)
});
};

exports.commandSettings = {
    name: "tag-yetki",
    aliases: ["tagyetki","tagy"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "tagyetki [Tag] [Rol ID]"
}