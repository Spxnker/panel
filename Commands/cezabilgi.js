const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')
const ceza = require('../Models/cezaSorgu.js')
const Register = require('../Models/regModel.js')
const kayit = require('../Models/cezaKayit.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed, banEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let staff = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || author

    let bruh = await kayit.findOne({guildID: message.guild.id,execID: staff.id})



    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
let res = await ceza.findOne({guildID: message.guild.id,execID: staff.id})
if(!res) return embedCreator("dsa",`${staff} kişisine ait ceza verileri bulunamadı!`,message,[true,10000])
let ban = res.Ban || 0
let jail = res.Jail || 0
let vmute = res.Vmute|| 0
let mute = res.Mute|| 0
let total = Number(mute) + Number(vmute) + Number(jail) +  Number(ban)
embedCreator("dsa",`
\`${staff.displayName}\` kişisinin cezalandırma bilgileri

Toplam \`${total}\` kişiyi cezalandırmış;
Bunlardan \`${ban}\` ban \`${jail}\` jail \`${mute}\` mute \`${vmute}\` ses cezası vermiş

`,message,[true, 30000])


};

exports.commandSettings = {
    name: "cezabilgi",
    aliases: ["cezab","cbilgi"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "cezabilgi @Shinoa/461212138346905600"
}