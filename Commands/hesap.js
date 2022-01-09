const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
let staff = victim || author
const embed = new MessageEmbed()
.setThumbnail(staff.user.avatarURL({dynamic: true}))
.setDescription(`
Merhaba \`${author.displayName}\` şu anda ${staff} kişisinin hesabını inceliyorsunuz!
**Hesap Bilgileri**
\`⦁\` **ID:** \`${staff.id}\`
\`⦁\` **Sunucu içi ismi:** \`${staff.displayName}\`
\`⦁\` **Tam İsmi:** \`${staff.user.tag}\`
\`⦁\` **Oluşturulma Tarihi:** \`${moment(staff.user.createdAt).format("DD/MM/YY HH:mm:ss")}\`
\`⦁\` **Sunucuya Katılım Tarihi:** \`${moment(staff.joinedAt).format(`DD/MM/YYYY | HH:mm`)}\`
\`⦁\` **Katılım Sırası:** \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= staff.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
\`⦁\` **Durumu:** \`${staff.presence.activities[0] ? staff.presence.activities[0].name + ` ${(staff.presence.activities[0].type)}`.replace("PLAYING", "Oynuyor").replace("STREAMING", "Yayında").replace("LISTENING", "Dinliyor").replace("WATCHING", "İzliyor").replace("CUSTOM_STATUS", "") : (staff.presence.status).replace("offline", "Görünmez/Çevrimdışı").replace("online", "Çevrimiçi").replace("idle", "Boşta").replace("dnd", "Rahatsız Etmeyin")}\`
`)
.setColor("RANDOM")
message.channel.send(embed)

};

exports.commandSettings = {
    name: "hesapbilgi",
    aliases: ["hb","hesap"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "hesapbilgi @Shinoa/461212138346905600"
}