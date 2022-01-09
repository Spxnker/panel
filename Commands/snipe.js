const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
moment.locale("TR")
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
let mesaj = client.snipe.get(message.channel.id)
if(!mesaj) return message.react(ayarlar.emojiler.red)

const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(mesaj.author.tag, mesaj.author.displayAvatarURL({ dynamic: true }))
            .setDescription(mesaj.content)
            .setFooter("Silinen Tarih: " + moment(mesaj.createdTimestamp).format("ll") + ", " + moment(mesaj.createdTimestamp).format("LTS"))
        message.channel.send(embed).then(msg => { msg.delete({ timeout: 3500 }) })
};

exports.commandSettings = {
    name: "snipe",
    aliases: [  ],
    guildOnly: true, 
    coolDown: 3000, 
    description: "snipe"
}