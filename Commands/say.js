const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {
if(!author.roles.cache.has(ayarlar.reg.regHammer) && !author.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

let sayi = 0;
const uyeSayisi = message.guild.memberCount;
const tagliUye = message.guild.members.cache.filter(u => u.user.username.toLowerCase().includes("✭")).size || 0;
    let discMembers = message.guild.members.cache.filter(x => x.user.discriminator == "0000").size;
    let tagli = message.guild.members.cache.filter(x => x.roles.cache.has("842141062998654987")).size

const onlineUye = message.guild.members.cache.filter(u => u.presence.status !== "offline").size;
const boosterUye = message.guild.members.cache.filter(u => u.roles.cache.get(ayarlar.guildRoles.boosterRole)).size || 0;
message.guild.channels.cache.filter(c => c.type === "voice").map(k => sayi += k.members.size);

embedCreator("sda",`• Sunucumuzda **Toplam** \`${uyeSayisi}\` Kullanıcı bulunmaktadır.\n• Şuan **Online** \`${onlineUye}\` Kullanıcı Bulunmaktadır.\n• **Tagımızda** \`${tagli}\` Kullanıcı bulunmaktadır.\n• Sunucumuzda \`${boosterUye}\` tane **booster** bulunmaktadır.\n• **Ses Kanallarında** \`${sayi}\` Kullanıcı bulunmaktadır.`,message,[true,150000])
message.react(ayarlar.emojiler.onay)

};

exports.commandSettings = {
    name: "say",
    aliases: ["sunucu-say"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "say"
}