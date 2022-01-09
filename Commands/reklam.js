const { MessageEmbed,MessageAttachment } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const limit = require('../Models/banLimit.js')
const ceza = require('../Models/cezaSorgu.js')
const kayit = require('../Models/cezaKayit.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed, permEmbed,banEmbed,logEmbed, rolAl } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
if(!author.roles.cache.has(ayarlar.guildHammer.banHammer) && !author.hasPermission("MANAGE_ROLES")) return permEmbed(message)
    let reason = args.splice(1).join(" ");
    if(!victim || !reason) return trueEmbed(message,this.commandSettings.description)
    let logKanal = client.channels.cache.get(ayarlar.guildLogs.banLogs)
    if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if(victim.user.bot) return botEmbed(message)


message.guild.members.ban(victim.id, {reason: reason,days: 7}).catch(x => embedCreator("DSADSA",`Bu Kullanıcıyı Yasaklayamıyorum`, message,[true, 5000]))

let count = await Database.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
let Penal = await new Database({
    guildID: ayarlar.guildSettings.guildID,
    execID: author.id,
    cezaID: count,
    victimID: victim.id,
    dateNow: Date.now(),
    activity: true,
    Temporary: false,
    Reason: reason,
    Type: "REKLAM"
}).save()
banEmbed("#DSA",`${victim.user.tag} kişisi sunucumuz sınırlarından ${author} tarafından reklam dolayısıyla kovuldu!`,message,[false])
if(logKanal) logEmbed(logKanal,`**${victim} sunucumuz sınırlarından reklam yapmaktan dolayı kovuldu!\n\n● Yasaklayan Yetkili: ${author}\n● Kanıt: \`${reason}\`\n● Ceza Tarihi: \`${client.toDate(new Date(Date.now()))}\`** \n\n● Ceza ID \`${count}\` `,message,[false])
message.react(ayarlar.emojiler.onay)






}

exports.commandSettings = {
    name: "reklam",
    aliases: [],
    guildOnly: true, 
    coolDown: 0, 
    description: "reklam @Shinoa/461212138346905600 [Kanıt LİNK]"
}