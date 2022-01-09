const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
moment.locale("tr")

exports.run = async(client, message, args, author, victim) => {
    if(!ayarlar.botSettings.botOwners.includes(message.author.id)) return
if(!victim) return message.channel.send("lol")

const flag = (victim.user.flags || await victim.user.fetchFlags()).toArray().includes("VERIFIED_BOT");

if(flag) {
    message.channel.send("war amk")
} else {
    message.channel.send("yok amk")

}
};

exports.commandSettings = {
    name: "deneme",
    aliases: ["denmre"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "ddeneme"
}