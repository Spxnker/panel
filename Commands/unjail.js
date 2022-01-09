const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {


    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.jailLogs);

if(!message.member.roles.cache.has(ayarlar.guildHammer.muteHammer) && !message.member.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)

let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi"
if (!victim  || reason.length < 1) return trueEmbed(message,this.commandSettings.description)

if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if (victim.user.bot) return botEmbed(message)
let mList = await Database.find({activity: true, victimID: victim.id, Type: "JAIL"})
if (mList.length <= 0) return embedCreator("#4D0A0A", `  ${victim} Kişisinin herhangi bir cezası bulunmuyor! `,message,[true,5000])


mList.forEach(d => {
    d.activity = false;
    d.save();
  });
setRoles(victim.id,ayarlar.guildRoles.unregister)


if(logKanal)  logEmbed(logKanal,`${victim} (\`${victim.id}\`) üyesinin cezası ${author} tarafından  ${reason} sebebiyle açıldı.`,message,[false])

embedCreator("#4D0A0A", `  ${victim} adlı üyenin cezası **${reason}** sebebi ile kaldırıldı. `,message,[true,5000])

message.react(ayarlar.emojiler.onay)


};

exports.commandSettings = {
    name: "unjail",
    aliases: ["jailkaldır"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "unjail @Shinoa/461212138346905600 [Sebep]"
}