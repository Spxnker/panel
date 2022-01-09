const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {


message.channel.send("1. tag: `Cléra`")
message.channel.send("2. tag: `Clera`")
message.channel.send("Etiket tagı: `#1971`")


};

exports.commandSettings = {
    name: "tag",
    aliases: [],
    guildOnly: true, 
    coolDown: 5000, 
    description: "tag"
}