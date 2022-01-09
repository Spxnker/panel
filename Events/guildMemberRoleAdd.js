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
    .setDescription(`${client.evet} ${member} - (\`${member.id}\`) kişisine rol eklendi!`)
    .addField("Ekleyen Kişi", `${entry.executor} - (\`${entry.executor.id}\`)`, false)
    .addField("Eklenen Rol", `${role} (\`${role.id}\`)`, false)
    .setFooter(entry.executor.tag, entry.executor.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    kanal.send(embed)

new rollogg({Rol: role.id,ExecID: entry.executor.id, emoji: client.evet,Date: Date.now(),victimID: member.id}).save()

}
module.exports.reqEv = {
    event: "guildMemberRoleAdd",
    isim: "Rol ekleyip Kaldırınca logluyo felan"
}