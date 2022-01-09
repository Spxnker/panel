const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let kişi = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

    message.channel.send(new MessageEmbed()
        .setImage(kişi.displayAvatarURL({ dynamic: true }))
        .setDescription(`[URL ADRESI](${kişi.displayAvatarURL({ dynamic: true })})`)
        .setFooter(`${author.user.tag} Tarafından istendi.`));

};

exports.commandSettings = {
    name: "avatar",
    aliases: ["pp","a"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "avatar @Shinoa/461212138346905600"
}