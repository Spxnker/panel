const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
 
if(message.author.id !== "461212138346905600") return
let onay = "https://cdn.discordapp.com/emojis/815832221104865310.gif?v=1"
let red = "https://cdn.discordapp.com/emojis/815831998839914506.gif?v=1"


guild.emojis.create(onay, "shinoa_onay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
guild.emojis.create(red, "shinoa_red").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
};

exports.commandSettings = {
    name: "emoji-kur",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "emoji-kur onay/red"
}