const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {


message.channel.send(ayarlar.guildSettings.invite)

};

exports.commandSettings = {
    name: "link",
    aliases: [],
    guildOnly: true, 
    coolDown: 5000, 
    description: "link"
}