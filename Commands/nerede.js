const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {

    if(!victim) trueEmbed(message,this.commandSettings.description)

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');

    let count = 0;
    if(!victim.voice.channel) return embedCreator("DSA",` ${client.red} ${victim} kişisi herhangi bir sesli kanalda bulunmuyor!`,message,[true, 10000])

    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    let def = victim.voice.selfDeaf ? `Sağırlaştırılmış ` : `Sağırlaştırılmamış ` 
    let mut = victim.voice.selfMute ? `Susturulmuş ` : `Susturulmamış `

    
    

    let sdef = victim.voice.serverDeaf ? `Sağırlaştırılmış ` : `Sağırlaştırılmamış ` 
    let smut = victim.voice.serverMute ? `Susturulmuş ` : `Susturulmamış `

embedCreator("#4D0A0A", `
${client.evet} Merhabalar \`${author.displayName}\` bakmış olduğunuz \`${victim.displayName}\` adlı üyenin ses bilgileri aşağıdadır

\`\`\`diff
⦁ Kullanıcı ${victim.voice.channel.name} adlı kanalda bulunuyor

+Mikrofon Durumu:
 > Sunucu Susturması: ${smut}
 > Kişisel Susturma: ${mut}


+Kulaklık Durumu

> Sunucu Sağırlaştırılması: ${sdef}
> Kişisel Sağırlaştırma: ${def}
\`\`\`


`,message,[true,15000])

};


exports.commandSettings = {
    name: "nerede",
    aliases: ["n"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "nerede @Shinoa/461212138346905600"
}