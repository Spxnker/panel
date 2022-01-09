const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')
const ceza = require('../Models/cezaSorgu.js')
const kayit = require('../Models/cezaKayit.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!author.roles.cache.has(ayarlar.guildHammer.vmuteHammer) && !author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
let time = args[1]
let reason = args.splice(2).join(" ");

    let logKanal = client.channels.cache.get(ayarlar.guildLogs.vmuteLogs)

if (!victim || !time || !ms(time) || reason.length < 1) return trueEmbed(message,this.commandSettings.description)
if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if (victim.user.bot) return botEmbed(message)
let data = await Database.find({guildID: ayarlar.guildSettings.guildID, victimID: victim.id, activity: true, Type: "VOICE-MUTE"})
if(data.length >= 1 ) return cezaEmbed(message)
await ceza.findOneAndUpdate({ guildID: message.guild.id, execID: author.id }, { $inc: { Ban: 0, Jail: 0, Mute: 0, Vmute: 1 } }, { upsert: true });
await kayit.findOneAndUpdate({ guildID: message.guild.id, execID: victim.id }, { $inc: { Jail: 0, Ban: 0, Mute: 0, Vmute: 1 } }, { upsert: true });

let count = await Database.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
let Penal = await new Database({
    guildID: ayarlar.guildSettings.guildID,
    execID: author.id,
    cezaID: count,
    victimID: victim.id,
    dateNow: Date.now(),
    activity: true,
    Temporary: true,
    Reason: reason,
    Type: "VOICE-MUTE",  
    finishDate: (Date.now() + ms(time))
}).save()

let yaziSure = time.replace("h", " Saat").replace("m", " Dakika").replace("d", " Gün").replace("s", " Saniye");
victim.voice.setMute(true)
embedCreator("#4D0A0A", ` ${victim} kişisi **${yaziSure}** boyunca **ses kanallarında** susuturuldu.\nSusturulma sebebi: \`${reason}\` (Ceza numarası: \`#${count}\`) `,message,[true,20000])
message.react(ayarlar.emojiler.onay)
logEmbed(logKanal, ` 

${victim} Kişisi ses kanallarında ${yaziSure} boyunca susturuldu! 

● Ceza Yetkili ${author} \`${author.id}\`
● Cezanın Başlama Tarihi \`${client.toDate(Date.now())}\`
● Cezanın Bitiş Tarihi    \`${client.toDate(Date.now() + ms(time))}\`
● Ceza Numarası \`${count}\`


`,message,[false])

};

exports.commandSettings = {
    name: "vmute",
    aliases: ["sesmute"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "vmute @Shinoa/461212138346905600 [Süre] [Sebep]"
}



