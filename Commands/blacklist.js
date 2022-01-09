const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/blackList')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
if(!author.hasPermission("ADMINISTRATOR")) return;
    let kisi
 kisi  = message.mentions.users.first() || client.users.cache.get(args[0])
kisi = message.guild.members.cache.get(kisi) ? kisi.id : args[0]
if(!kisi) return message.channel.send("Blackliste atmak için kişi belirlemeniz gerek")
let aa = []
Database.findOne({guild: message.guild.id},(err,res) => {
    if(!res) {
        aa.push(kisi)
new Database({guild: message.guild.id,engel: aa}).save()
message.react(ayarlar.emojiler.onay)
message.guild.members.ban(kisi,{reason: "Blacklist (Açılmayacak)",days: 7})


} else {
        res.engel.push(kisi)
        res.save()
        message.react(ayarlar.emojiler.onay)
        message.guild.members.ban(kisi,{reason: "Blacklist (Açılmayacak)",days: 7})


    }
})
};

exports.commandSettings = {
    name: "blacklist",
    aliases: ["acilmaz-ban"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "blacklist [Kişi ID]"
}