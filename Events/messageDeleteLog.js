const { Discord, MessageEmbed } = require('discord.js');



module.exports = async(message) => {
    if(message.author.bot) return
    const kanal = client.channels.cache.get("844514522911735819")
  if(message.attachments.first()) {
    const emb2 = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`<#${message.channel.id}> kanalında ${message.author} tarafından bir mesaj silindi\n Silinen Fotoğraf`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setImage(message.attachments.first().proxyURL)
  kanal.send(emb2)
  
  } else {
    const emb = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("`Silinen Mesaj:`,",`**${message.content}**`,true)
    .addField("`Mesajın Sahibi:`",`${message.author}`,true)
    .addField("`Mesajın Kanalı:`",`${message.channel}`,true)
    .addField("`Tarih`", client.toDate(new Date()),true)
    .setFooter("Silindiği saat")
    .setTitle("[Mesaj Silindi]")
    .setTimestamp()
  
    kanal.send(emb)
    client.snipe.set(message.channel.id,message)
  }
}
module.exports.reqEv = {
    event: "messageDelete",
    isim: "Message Log"
}