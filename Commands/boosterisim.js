const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args, author, victim) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    if(!message.member.roles.cache.has(ayarlar.guildRoles.boosterRole)) return permEmbed(message)

const tag = author.user.username.includes(ayarlar.guildSettings.tag) ? ayarlar.guildSettings.tag : ("⦁" === "" ?  ayarlar.guildSettings.tag : "⦁");

let isim = args.join(' ')
if(!isim) return trueEmbed(message,this.commandSettings.description)
if(author.manageable) message.member.setNickname(`${tag} ${isim}`)
let isiml = `${tag} ${isim}`

Database.findOne({guildID: message.guild.id, victimID: author.id}, (err, res) => {
    if(!res) {
    new Database({guildID: message.guild.id, victimID: author.id, nicknames: [{isimler: `${isiml}`,rol: `Booster isim değiştirme`}]}).save()
    } else {
        res.nicknames.push({isimler: `${isiml}  `,rol : `Booster isim değiştirme`})
    res.save()
    }
    
    })
message.react(ayarlar.emojiler.onay)

};

exports.commandSettings = {
    name: "booster-isim",
    aliases: ["bisim","zengin","booster"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "zengin [Nickname]"
}