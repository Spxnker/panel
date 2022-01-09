const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const parsems = require('parse-ms')
const Database = require('../Models/member.js')
module.exports = message => {

    let pms = require('parse-ms')
  if(message.content.startsWith('.afk')) return
    let author = message.author
    Database.findOne({Afk: true}, (err, res) => {
    if(res) {
      let reason =    res.Reason
  
      let süre = pms(Date.now()-res.datenow)
      if (message.mentions.members.filter(x => x.id !== author.id).some(x => res.memberID.includes(x.id))){
        const victim = message.mentions.users.first()
          if(message.author.bot) return
        if (!res) return;
  
        if (süre.days !== 0) {
          message.channel.send(`${victim} kullanıcısı **${süre.days}** gün **${süre.hours}** saat **${süre.minutes}** dakika önce **AFK** moduna girdi.\nAFK Nedeni: \`${reason}\``).then(m => m.delete({ timeout: 6000 }));
          return;
        } else if (süre.hours !== 0) {
          message.channel.send(`${victim} kullanıcısı **${süre.hours}** saat **${süre.minutes}** dakika önce **AFK** moduna girdi.\nAFK Nedeni: \`${reason}\``).then(m => m.delete({ timeout: 6000 }));
          return;
        } else if (süre.minutes !== 0) {
          message.channel.send(`${victim} kullanıcısı **${süre.minutes}** dakika önce **AFK** moduna girdi.\nAFK Nedeni: \`${reason}\``).then(m => m.delete({ timeout: 6000 }));
          return;
        } else if (süre.seconds !== 0) {
          message.channel.send(`${victim} kullanıcısı biraz önce **AFK** moduna girdi.\nAFK Nedeni: \`${reason}\``).then(m => m.delete({ timeout: 6000 }));
          return;
        };
  
  
  
  
      } else {
        Database.findOne({Afk: true, memberID: message.author.id}, (err, res) => {
          if(!res) return
          res.delete()
          if(message.member.manageable && message.member.displayName.startsWith('[AFK]')) {
            message.member.setNickname(message.member.displayName.replace(/\[AFK\] ?/gi, ''));
          }
          message.reply(`Afk modundan başarıyla çıkış yaptın. `).then(m => m.delete({ timeout: 6000 }));          
          //@Best Bodcu AFK modundan başarıyla çıkış yaptın, birkaç saniye önce AFK olmuştun.

        })

  
      }

    }
    })


}


module.exports.reqEv = {
    event: "message",
    isim: "AFK Command"
};