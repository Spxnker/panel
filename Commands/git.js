const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);

    let shx = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, author.user.avatarURL({dynamic:true})).setFooter(ayarlar.botSettings.setFooter)
    if (!author.voice.channel) return message.channel.send(shx.setDescription(`İlk Önce Ses Kanallarından Birine Girmelisin Girdikten Sonra Tekrar Denersen Olacaktır.`).setFooter(client.user.username,client.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (!victim) return message.channel.send(shx.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    const filter = (reaction, user) => {
    return [ayarlar.emojiler.onay, ayarlar.emojiler.red].includes(reaction.emoji.id) && user.id === victim.id;
    };
    if (victim.user.bot) return message.channel.send(shx.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if(victim.id == (`${message.author.id}`)) return message.channel.send(shx.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (author.voice.channelID === victim.voice.channelID) return message.channel.send(shx.setDescription(`Belirttiğin Kişi İle Aynı Kanaldasın.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (!victim.voice.channel) return message.channel.send(shx.setDescription(`Belirttiğin Kişi Bir Ses Kanalına Bağlı Değil.`)).then(msg => msg.delete({timeout: 5000}), message.react(ayarlar.emojiler.red))
    if (author.hasPermission('ADMINISTRATOR') || author.roles.cache.has(ayarlar.guildHammer.auth) ||  ayarlar.guildHammer.yts.some(u => author.roles.cache.has(u))) return author.voice.setChannel(victim.voice.channelID).catch(err => {}) && message.channel.send(new MessageEmbed().setDescription(`Başarıyla <@${victim.id}> adlı üyenin kanalına taşındınız.`).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000})) && message.react(ayarlar.emojiler.onay)
    message.channel.send(`<@${victim.id}>`).then(msg => msg.delete({timeout: 5000}))
    message.channel.send(new MessageEmbed().setDescription(`<@${victim.id}>, <@${message.author.id}> Bulunduğunuz Sesli Kanala Gelmek İstiyor. Kabul Ediyor Musunuz? \n Eğer istek 20 saniye içinde onaylanmazsa iptal edilecek.`).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`))
    .then(m => m.react(ayarlar.emojiler.onay)
    .then(a => m.react(ayarlar.emojiler.red))
    .then(s =>
    m
    .awaitReactions(filter, { max: 1, time: 20000, error: ["time"] })
    .then(collected => {
    const reaction = collected.first()
    if (reaction.emoji.id === ayarlar.emojiler.onay) {
    message.channel.send(new  MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişinin bulunduğu ses kanalına taşındın. `).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000}))
    m.delete()
    message.react(ayarlar.emojiler.onay)
    author.voice.setChannel(victim.voice.channelID).catch(err => {})
    } else {
    message.channel.send(new MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişi bulunduğu ses kanalına gelmeni istemiyor bu sebepten ötürü ses kanalına taşıyamadım. `).setAuthor(message.author.tag, author.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000}))
    m.delete()
    message.react(ayarlar.emojiler.red)
    }
    }).catch(err => m.edit(new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, author.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && message.react(ayarlar.emojiler.red))
    ));
};

exports.commandSettings = {
    name: "git",
    aliases: ["gitt"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "git @Shinoa/461212138346905600"
}