const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed, permEmbed, cezaEmbed,renkTuret } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
if(!message.member.hasPermission("MANAGE_ROLES")) return permEmbed()

if(!victim) return trueEmbed(message,this.commandSettings.description)



Database.find({victimID: victim.id}, async (err, res) => {
    if (res.length <= 0) return   embedCreator("dsa","Bu Kişinin herhangi bir sicil geçmişine rastlanmadı",message,[true, 150000])
    let listed = res.reverse();
  let History = listed.map((x, index) => `\n \`${index + 1}.\` **[${x.Type}]** <@${x.execID}> (\`${x.execID}\`) tarafından **${x.Reason}** sebebiyle cezalandırıldı. \n **Ceza ID:** \`(#${x.cezaID})\``);

  client.splitEmbedWithDesc(`**${victim} Üyesinin Sicili**\n ${History.join("\n")}`,
  {name: author.user.tag, icon: message.author.displayAvatarURL({dynamic: true, size: 2048})},
  {name: ayarlar.botSettings.setFooter, icon: false},
  {setColor: renkTuret(), setTimestamp: [Date.now()]}).then(list => {
list.forEach(item => {
message.channel.send(item);
});
});


})








};

exports.commandSettings = {
    name: "sicil",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "sicil @Shinoa/461212138346905600"
}