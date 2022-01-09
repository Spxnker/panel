const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')
const ceza = require('../Models/cezaSorgu.js')
const kayit = require('../Models/cezaKayit.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.jailLogs);
     let reason = args.splice(1).join(" ");

     if (!victim  || reason.length < 1) return trueEmbed(message,this.commandSettings.description)

     if(!author.roles.cache.has(ayarlar.guildHammer.jailHammer) && !author.hasPermission("ADMINISTRATOR") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u)))  return permEmbed(message)
     if (author.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if (victim.user.bot) return botEmbed(message)
     let data = await Database.find({guildID: message.guild.id, victimID: victim.id, activity: true, Type: "JAIL"})
     if(data.length >= 1 ) return cezaEmbed(message)
     let count = await Database.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
await ceza.findOneAndUpdate({ guildID: message.guild.id, execID: author.id }, { $inc: { Ban: 0, Jail: 1, Mute: 0, Vmute: 0 } }, { upsert: true });
await kayit.findOneAndUpdate({ guildID: message.guild.id, execID: victim.id }, { $inc: { Jail: 1, Ban: 0, Mute: 0, Vmute: 0 } }, { upsert: true });

let Penal = await new Database({
    guildID: message.guild.id,
    execID: message.author.id,
    cezaID: count,
    victimID: victim.id,
    dateNow: Date.now(),
    activity: true,
    Temporary: false,
    Reason: reason,
    Type: "JAIL"
}).save()
setRoles(victim.id, ayarlar.guildRoles.jailRole)
 embedCreator("#4D0A0A", `${victim} (\`${victim.id}\`) adlı üye cezalıya gönderildi.\nCezalıya gönderilme sebebi: **__${reason}__** (Ceza numarası: \`#${count}\`)`,message,[true,5000])
if(logKanal) logEmbed(logKanal,`**${victim}, ${author} tarafından \`${reason}\` nedeniyle hapishaneye yollandı! \`CezaNo: ${count}\`** `,message,[false])
};

exports.commandSettings = {
    name: "jail",
    aliases: ["cezalı","fjail"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "jail @Shinoa/461212138346905600 [Sebep]"
}