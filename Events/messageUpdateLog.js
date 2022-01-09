const { Discord, MessageEmbed } = require('discord.js');



module.exports = async(oldMessage,newMessage) => {
    if(oldMessage.author.bot) return

    const kanal = client.channels.cache.get("844514522911735819")
  if(oldMessage.content == newMessage.content) return
    const emb = new MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL({dynamic: true}))
    .setThumbnail(oldMessage.author.avatarURL({dynamic: true}))
    .setTimestamp()
  .addField("`Eski Mesaj`",`**${oldMessage.content}**`,true)
  .addField("`Yeni Mesaj`",`**${newMessage.content}**`,true)
  .addField("`Mesajın Sahibi`",`${oldMessage.author}`,true)
  .addField("`Tarih`",client.toDate(new Date()),true)
  .setTitle("[Mesaj Düzenlendi]")
  kanal.send(emb)
}
module.exports.reqEv = {
    event: "messageUpdate",
    isim: "Message Update eventini loglar"
}