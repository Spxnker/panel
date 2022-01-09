const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/member.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let reason = args.join(" ") || "Şu anda AFK'yım en kısa sürede döneceğim.";
if(message.member.displayName.includes("[AFK]")) return
    if (reason.includes("discord.gg") || reason.includes("@everyone") || reason.includes("@here") || reason.includes(message.mentions.roles.first())) {
        message.delete({timeout: 10});
        message.reply("`AFK` **moduna giriş yaparken link veya etiket (`@everyone, @Rol`) atamazsın.**", { disableMentions: "everyone" }).then(m => m.delete({ timeout: 3500 }));
        return;
};

Database.findOne({memberID: author.id}, (err, res)  => {
if(!res) {
new Database({Afk: true, Reason: reason, datenow: Date.now(), memberID: author.id}).save()
} else {
    res.Reason = reason
    res.datenow = Date.now()
    res.save()
}
if ((author.manageable) && (author.displayName.length < 28)) author.setNickname(`[AFK] ${author.displayName}`).catch(err => message.channel.send(err.message));
message.reply(`Başarıyla AFK moduna geçtin ve mesajını şu şekilde ayarladım **${reason}**`).then(m => m.delete({ timeout: 6000 }));
//@[AFK] Best Bodcu, Başarıyla AFK moduna geçtin ve mesajını şu şekilde ayarladım Şu an AFK olabilirim... Ama döneceğim !.

})



 };

exports.commandSettings = {
    name: "afk",
    aliases: [],
    guildOnly: true, 
    coolDown: 100000, 
    description: "afk [Sebep]"
}