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
    if(member.user.bot) return
function haha () {
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
            member.setNickname("Yasaklı Tag")
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
 
}
setTimeout(() => {
    haha()
}, 3000);

}


module.exports.reqEv = {
    event: "guildMemberAdd",
    isim: "Ceza kontrol ve hosgeldin"
};