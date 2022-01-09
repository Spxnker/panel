const { MessageEmbed,MessageAttachment } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const limit = require('../Models/banLimit.js')
const ceza = require('../Models/cezaSorgu.js')
const kayit = require('../Models/cezaKayit.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed, permEmbed,banEmbed,logEmbed, rolAl } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
if(!author.roles.cache.has(ayarlar.guildHammer.banHammer) && !author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)
    let reason = args.splice(1).join(" ");
    if(!victim || !reason) return trueEmbed(message,this.commandSettings.description)
    let logKanal = client.channels.cache.get(ayarlar.guildLogs.banLogs)
    if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if(victim.user.bot) return botEmbed(message)






await limit.findOneAndUpdate({ guildID: message.guild.id, execID: author.id }, { $inc: { limit: 1 } }, { upsert: true });


message.guild.members.ban(victim.id, {reason: reason,days: 7}).catch(x => embedCreator("DSADSA",`Bu Kullanıcıyı Yasaklayamıyorum`, message,[true, 5000]))

let banLimit = await limit.findOne({guildID: message.guild.id, execID: author.id})

if(banLimit.limit > 7) {
if(author.roles.cache.has(ayarlar.guildHammer.banHammer))    rolAl(author.id, ayarlar.guildHammer.banHammer) 
    embedCreator("DSASDA",`1 Saat içinde 7 tane ban attığın için ban yetkine el koydum!`,message,[true, 2000])
return
}






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
    Type: "BAN"
}).save()
banEmbed("#DSA",`    kişisi sunucumuz sınırlarından ${author} tarafından **__${reason}__** sebebi ile kovuldu`,message,[false])
if(logKanal) logEmbed(logKanal,`**${victim} sunucumuz sınırlarından kovuldu!\n\n● Yasaklayan Yetkili: ${author}\n● Yasaklama Nedeni: \`${reason}\`\n● Ceza Tarihi: \`${client.toDate(new Date(Date.now()))}\`** \n\n**● Ceza ID** \`${count}\` `,message,[false])
message.react(ayarlar.emojiler.onay)
let limitC = client.channels.cache.get(ayarlar.guildLogs.banLimit)

if(banLimit.limit >= 7) {
    let data = await Database.find({guildID: message.guild.id, execID: author.id,Type: "BAN"}).catch(console.error())
    let list = data.reverse()
    let history = list.map((value, index) => `${value.victimID} |  ${client.toDate(value.dateNow)} | ${value.Reason}`).slice(0, 7)
    

    logEmbed(limitC,`
    ${author} kişisi  \`1 saatte\` \`7\` ban attığı için yetkilerini aldım Aşşağıda Son Attığı 7 yasaklama gözüküyor;  

    \`\`\`
KİŞİ               | TARİH                | SEBEP


${history.join("\n")}
    \`\`\`

    `,message,[false])
}

await kayit.findOneAndUpdate({ guildID: message.guild.id, execID: victim.id }, { $inc: { Ban: 1, Jail: 0, Mute: 0, Vmute: 0 } }, { upsert: true });

await ceza.findOneAndUpdate({ guildID: message.guild.id, execID: author.id }, { $inc: { Ban: 1, Jail: 0, Mute: 0, Vmute: 0 } }, { upsert: true });


}

exports.commandSettings = {
    name: "ban",
    aliases: ["yasakla","uçur"],
    guildOnly: true, 
    coolDown: 0, 
    description: "ban @Shinoa/461212138346905600 [Sebep]"
}