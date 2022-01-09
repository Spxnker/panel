const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/randomMesaj')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
let komut = args[0] 
if(komut == "ekle") {
    
}
};

exports.commandSettings = {
    name: "iltifat",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "iltifat ekle-kaldir"
}