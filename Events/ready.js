const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/ExecutorModel.js')
const data = require('../Models/komutEngel')
module.exports = async() => {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bruh Aktif, Komutlar ve Eventler Yüklendi!`);
        client.user.setPresence({ activity: { name: "Spanker 💙 Shinoa", type: "PLAYING" }, status: "dnd" })
            .catch(console.error);
client.channels.cache.get(ayarlar.botSettings.botVoiceChannel).join()
let all = data.findOne({guild: ayarlar.guildSettings.guildID},(err,res) => {
    if(!res) return
    let aaa = res.engel || []
  aaa.forEach( (element) => {
    client.blockedFromCommand.push(element)
  });
  
  })




    },


    module.exports.reqEv = {
        event: "ready",
        isim: "Presence Ayari"
    };