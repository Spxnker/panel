const { Discord, MessageEmbed } = require('discord.js');
const Database = require('../Models/ExecutorModel.js');
const Blacklist = require('../Models/blackList.js');

const ayarlar = require('../ayarlar.json')
const moment = require('moment');
const data = require('../Models/yasakliTag.js')
const shinoa = require('../system.json')
const { setRoles,renk, embedCreator, rolVer } = require('../functions.js');
moment.locale("TR")


module.exports = async(member) => {

if(shinoa.shinoaBlack.includes(member.id)) {
    member.guild.members.ban(member.id,{reason: "Spanker#1956 Açılmayacak Kişisel",days: 7})

}


Blacklist.findOne({guild: member.guild.id},(err,res) => {
if(res) {
    if(res.engel.lenght < 1) return
    if(res.engel.includes(member.id)) {
       return  member.guild.members.ban(member.id,{reason: "Blacklist (Açılmayacak)",days: 7})
    }
}
}) 

let ytag = data.findOne({guild: member.guild.id},(err,res) => {
    if(res) {
        if(res.taglar.lenght < 1) return
    res.taglar.forEach(x => { 
        if(member.user.username.includes(x)) {
            return setRoles(member.id,ayarlar.yasakliTag.yasakliTagRole)
            
        }
    })
}
})

let a = Database.findOne({guildID: member.guild.id,victimID: member.id},(err,res) => {
    if(res)  {
    if(res.Type == "MUTE") {
rolVer(member.id,ayarlar.guildRoles.muteRole)
    } else if(res.Type == "JAIL") {
        return setRoles(member.id,ayarlar.guildRoles.jailRole)

    } 
}
})
 
if(member.user.bot) return

let pdxemb = new MessageEmbed()
.setFooter(`Aramıza hoş geldin ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
.setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
const suspLog = client.channels.cache.get(ayarlar.guildLogs.susLogs)
const otoRolLog = client.channels.cache.get(ayarlar.guildLogs.otoRoleLogs)
let suphelilik = true;
if ((Date.now() - member.user.createdAt) > (1000 * 60 * 60 * 24 * 7)) suphelilik = false; // 7 Gün! Değiştirebilirsniz
let guildSize = member.guild.members.cache.size;

if(suphelilik) {
rolVer(member.id,ayarlar.guildRoles.sus)
if (suspLog) suspLog.send(pdxemb.setColor(renk(2)).setDescription(`**Sunucumuza ${member} katıldı. Hesabı \`7\` günden yeni olduğu için ona <@&${supheliRol}> verdim.**`))
member.setNickname(`• Şüpheli Hesap`)

} else {
    rolVer(member.id,ayarlar.guildRoles.unregister)
    if (otoRolLog) otoRolLog.send(pdxemb.setColor(renk(0)).setDescription(`**Sunucumuza ${member} katıldı. Ona rolünü verdim. Onunla beraber \`${member.guild.members.cache.size}\` kişi olduk.**`))
        member.setNickname(`● İsim | Yaş`)

    if(member.user.username.includes(ayarlar.guildSettings.tag)) rolVer(member.id,ayarlar.reg.familyRole)
    if(ayarlar.guildSettings.tag.some(u => member.user.tag.includes(u))) rolVer(member.id,ayarlar.reg.familyRole)

}

setTimeout(async() => {
    let welcome = client.channels.cache.get(ayarlar.guildLogs.welcome)
    let dort = "";
    if (!suphelilik) dort = client.evet
    else dort = client.red
    let emoji = "•" //İsterseniz bir emojiyle değişin
    welcome.send(`
    :tada: ${member.guild.name} Sunucusuna Hoşgeldin ${member}, seninle beraber  \`${member.guild.members.cache.size}\` kişi olduk.

Hesabın ${moment(member.user.createdTimestamp).format("LLL")} tarihinde (${moment(member.user.createdTimestamp).fromNow()}) oluşturulmuş. ${dort}

Sunucu Kurallarımız <#842141063900037143> kanalında belirtilmiştir, unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Tagımızı alarak bize destek çıkabilir, yetkili kadromuza katılabilirsin. iyi Eğlenceler dilerim.
    
    `)

}, 1000)

}


module.exports.reqEv = {
    event: "guildMemberAdd",
    isim: "Ceza kontrol ve hosgeldin"
};