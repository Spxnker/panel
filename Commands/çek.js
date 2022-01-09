const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);

    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(ayarlar.botSettings.setFooter ).setColor("RANDOM").setTimestamp();



    let shx = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, author.user.avatarURL({dynamic:true}))
    if (!author.voice.channel) {
    return message.channel.send(new MessageEmbed().setDescription(`İlk önce ses kanallarından birine girmelisin. Girdikten sonra tekrar denersen olacaktır.`).setFooter(client.user.username,client.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))  } 
    if (!victim) return message.channel.send(shx.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (victim.user.bot) return message.channel.send(shx.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if(victim.id == (`${message.author.id}`)) return message.channel.send(shx.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (!victim.voice.channel) return message.channel.send(shx.setDescription(`Belirttiğin Kişi herhangi bir ses kanalında değil.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (author.hasPermission('ADMINISTRATOR') && author.roles.cache.has(ayarlar.guildHammer.auth)  && ayarlar.guildHammer.yts.some(u => author.roles.cache.has(u))) return author.voice.setChannel(victim.voice.setChannel(author.voice.channelID)).catch(err => {}) && message.channel.send(new MessageEmbed().setDescription(`Başarıyla <@${victim.id}> adlı üye kanalınıza taşındı.`).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000})) && message.react(ayarlar.emojiler.onay)
    const filter = (reaction, user) => {
    return [ayarlar.emojiler.onay, ayarlar.emojiler.red].includes(reaction.emoji.id) && user.id === victim.id;
    };
    message.channel.send(`<@${victim.id}>`).then(msg => msg.delete({timeout: 5000}))
    message.channel.send(new MessageEmbed().setFooter('Eğer istek onaylanmazsa 20 saniye sonra iptal edilecek.').setDescription(`<@${message.author.id}> bulunduğu ses kanalına çekmek istiyor. Kabul ediyor musun?`).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`))
    .then(m => m.react(ayarlar.emojiler.onay)
    .then(a => m.react(ayarlar.emojiler.red))
    .then(s =>
    m
    .awaitReactions(filter, { max: 1, time: 20000, error: ["time"] })
    .then(collected => {
    const reaction = collected.first()
    if (reaction.emoji.id === ayarlar.emojiler.onay) {
    message.react(ayarlar.emojiler.onay)
    message.channel.send(new MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişiyi bulunduğun ses kanalına taşıdın. `).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(m => m.delete({timeout: 5000}));
    victim.voice.setChannel(victim.voice.setChannel(author.voice.channelID)).catch(err => {})
    m.delete()
    }
    if (reaction.emoji.id === ayarlar.emojiler.red) {
    message.react(ayarlar.emojiler.red)
    message.channel.send(new MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişi bulunduğun ses kanalına gelmek istemiyor bu sebepten ötürü bulunduğun ses kanalına taşıyamadım. `).setAuthor(author.displayName, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(m => m.delete({timeout: 5000}));
    m.delete();
    }
    }).catch(err => m.edit(new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, author.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && message.react(ayarlar.emojiler.red))
    ));

};

exports.commandSettings = {
    name: "çek",
    aliases: ["gel"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "çek @Shinoa/461212138346905600"
}