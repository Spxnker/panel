const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const data = require('../Models/komutEngel.js')

const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!ayarlar.botSettings.botOwners.includes(message.author.id)) return
let dataaa = data.findOne({guild: message.guild.id},(err,res) => {
    if(!res) return message.channel.send("lol")
    if(!victim) return message.channel.send("haha")
res.engel.remove(victim.id)
res.save()
})
};

exports.commandSettings = {
    name: "komut-engel",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "komut-engel kaldır"
}