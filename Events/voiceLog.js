const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/ExecutorModel.js');
const { embedCreator } = require('../functions');
const {MessageEmbed} = require('discord.js')

module.exports = async(oldState, newState) => {
    let member = newState.guild.members.cache.get(newState.member.id)
    if(member.user.bot) return
const embed = new MessageEmbed()
.setAuthor(member.displayName,member.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setFooter("Eylem Tarihi")
.setColor("RANDOM")
const log = client.channels.cache.get("844515429921456189")

    if (!oldState.channelID && newState.channelID) return log.send(embed.setDescription(`\`${member.displayName}\` Kişisi \`${newState.guild.channels.cache.get(newState.channelID).name}\` isimli kanala **katıldı!**`))
    if (oldState.channelID && !newState.channelID) return log.send(embed.setDescription(`\`${member.displayName}\` Kişisi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` isimli kanaldan **ayrıldı!** `))
    if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return log.send(embed.setDescription(`\`${member.displayName}\` Kişisi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` isimli kanaldan \`${newState.guild.channels.cache.get(newState.channelID).name}\` isimli kanala geçiş **yaptı** `))

 
    },


    module.exports.reqEv = {
        event: "voiceStateUpdate",
        isim: "Voice Log"
    };