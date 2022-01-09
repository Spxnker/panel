const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {


    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.vmuteLogs);

if(!message.member.roles.cache.has(ayarlar.guildHammer.muteHammer) && !message.member.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi"
if (!victim  || reason.length < 1) return trueEmbed(message,this.commandSettings.description)

if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if (victim.user.bot) return botEmbed(message)
let mList = await Database.find({activity: true, victimID: victim.id, Type: "VOICE-MUTE"})
if (mList.length <= 0) return embedCreator("#4D0A0A", `  ${victim} Kişisinin herhangi bir cezası bulunmuyor! `,message,[true,5000])


mList.forEach(d => {
    d.activity = false;
    d.save();
  });
if(victim.voice.channel) victim.voice.setMute(false)

if(logKanal)  logEmbed(logKanal,`${victim} (\`${victim.id}\`) üyesinin ses susturması ${author} tarafından  ${reason} sebebiyle açıldı.`,message,[false])

embedCreator("#4D0A0A", `  ${victim} adlı üyenin ses susturması **${reason}** sebebi ile kaldırıldı. `,message,[true,5000])
message.react(ayarlar.emojiler.onay)


};

exports.commandSettings = {
    name: "unvmute",
    aliases: ["unvoicemute"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "unmute @Shinoa/461212138346905600 [Sebep]"
}