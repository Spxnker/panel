const { MessageEmbed, MessageAttachment } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')
const ceza = require('../Models/cezaSorgu.js')
const Register = require('../Models/regModel.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);

let data = await Register.find({guildID: message.guild.id}).sort({ teyitler: "descending" });
let list = data.filter(x => ((x.erkek + x.kari !== 0)) && (message.guild.members.cache.get(x.execID)) )
    embedCreator("#4D0A0A", ` Top Teyit Listesi; \n\n${list.length ? list.map((d, index) => `\`${index+1}.\` <@${d.execID}> | ${d.erkek + d.kari } ( Erkek:\`${d.erkek}\` Kadın: \`${d.kari}\`) ${d.execID == message.author.id ? "(Siz)": ""} `).splice(0, 30).join("\n") : "Bulunamadı!"} `,message,[true,30000])


};

exports.commandSettings = {
    name: "topteyit",
    aliases: ["tt","tteyit"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "topteyit"
}