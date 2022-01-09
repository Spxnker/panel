const { Discord, MessageEmbed } = require('discord.js');
const Database = require('../Models/regModel.js');
const Blacklist = require('../Models/blackList.js');

const ayarlar = require('../ayarlar.json')
const moment = require('moment')



module.exports = member => {

if(["844179278547517440","844179280275046432","844179279369732108"].some(u => member.roles.cache.has(u))) return
    let isiml = member.displayName
    Database.findOne({guildID: member.guild.id, victimID: member.id}, (err, res) => {
        if(!res) {
        new Database({guildID: member.guild.id, victimID: member.id, nicknames: [{isimler: `${isiml} `,rol: `Sunucudan Ayrılma`}]}).save()
        } else {
            res.nicknames.push({isimler: `${isiml}  `,rol : `Sunucudan Ayrılma`})
        res.save()
        }
        
        })



}


module.exports.reqEv = {
    event: "guildMemberRemove",
    isim: "Sunucudan ayrılma mesajı kaydetme"
};