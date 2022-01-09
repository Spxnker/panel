const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const rollog = require('../Models/rolLogModel.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    if(!victim) return trueEmbed(message,this.commandSettings.description)
    if( !author.hasPermission("MANAGE_ROLES") && ayarlar.guildHammer.yts.some(u => !author.roles.cache.has(u))) return permEmbed(message)


rollog.find({ExecID: victim.id}, async (err, res) => {
    if(res.length < 1) return embedCreator("dsa",`${victim} kişisinin herhangi bir rollog kaydına ulaşamadım!`,message,[true, 10000])
    let listed = res.reverse()
    let mapped = listed.map((value,index) => `${value.emoji} <@&${value.Rol}> \`=>\` <@${value.victimID}> (\`${client.toDate(value.date)}\`) `).slice(0,10)
    
    embedCreator("dsa",`
    Merhabalar \`${author.displayName}\` şu anda ${victim} kişisinin son 10 rol loguna bakmaktasın!
    
    ${mapped.join("\n\n")}
    
    `,message,[true, 45000])
})
 };

exports.commandSettings = {
    name: "rollog",
    aliases: ["rol-log"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "rollog @Shinoa/461212138346905600"
}