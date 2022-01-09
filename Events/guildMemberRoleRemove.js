const { Discord, MessageEmbed } = require('discord.js');
const rollogg = require('../Models/rolLogModel.js');
const moment = require('moment');



module.exports = async(member,role) => {

    moment.locale("TR")
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    const kanal = client.channels.cache.get("844514391243358229")
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
    if(entry.executor.bot) return;
const embed = new MessageEmbed()

.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
.setColor("RANDOM")
.setDescription(`${client.red} ${member} - (\`${member.id}\`) kişisinden rol alındı!`)
.addField("Alan Kişi", `${entry.executor} - (\`${entry.executor.id}\`)`, false)
.addField("Alınan Rol", `${role}`, false)
.setFooter(entry.executor.tag, entry.executor.displayAvatarURL({ dynamic: true }))
.setTimestamp()
kanal.send(embed)
    new rollogg({Rol: role.id,ExecID: entry.executor.id, emoji: client.red,date: Date.now(),victimID: member.id}).save()

}
module.exports.reqEv = {
    event: "guildMemberRoleRemove",
    isim: "Rol Kaldırınca logluyo felan"
};