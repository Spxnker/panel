const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/blackList')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');

exports.run = async(client, message, args, author, victim) => {
    if(!author.hasPermission("ADMINISTRATOR")) return;

let kisi = args[0]
if(!kisi) return message.channel.send("Blacklistten çıkarmanız için bir kişi belirtmeniz gerek")
let aa = []
Database.findOne({guild: message.guild.id},(err,res) => {
if(!res)  {
    new Database({guild: message.guild.id,engel: []}).save()
    message.channel.send("Blacklistte herhangi biri yok")
return
} else {
if(!res.engel.lenght < 1) return message.react(ayarlar.emojiler.red)
    if(!res.engel.includes(kisi)) return message.channel.send("Belirttiğiniz kişi blacklistte değil")
    res.engel.remove(kisi)
    res.save()
    message.react(ayarlar.emojiler.onay)
}
})
};

exports.commandSettings = {
    name: "un-blacklist",
    aliases: ["unblack"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "blacklist [Kişi ID]"
}