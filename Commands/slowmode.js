const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {

    if (!message.member.hasPermission('ADMINISTRATOR') && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

    let miktar = Number(args[0]);
    if (!miktar) return trueEmbed(message,this.commandSettings.description)
    message.channel.setRateLimitPerUser(miktar).catch(err => message.channel.send(`Bir hata oluştu! | ${err}`));
    message.react(ayarlar.emojiler.onay);
    embedCreator("dsa",`${client.evet} Slowmode başarıyla **${miktar}** olarak değişti!`,message,[true, 5000])

};

exports.commandSettings = {
    name: "slowmode",
    aliases: [],
    guildOnly: true, 
    coolDown: 5000, 
    description: "temizle [Temizlenecek Sayı]"
}