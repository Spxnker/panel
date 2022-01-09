const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed, setRoles } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {
if(!author.roles.cache.has(ayarlar.reg.regHammer) && !author.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
    if (!victim) return trueEmbed(message,this.commandSettings.description)


setRoles(victim.id, ayarlar.guildRoles.unregister)
message.react(ayarlar.emojiler.onay)


};

exports.commandSettings = {
    name: "unregister",
    aliases: ["kayıtsız","unreg"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "unreg @Shinoa/461212138346905600"
}