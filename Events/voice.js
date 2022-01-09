const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/ExecutorModel.js');
const { embedCreator } = require('../functions');

module.exports = async(oldState, newState) => {

    async function ses() {

    }

    if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)){ // Kanal değiştirmek ya da kanaldan çıkmak.

        let uye = newState.member;
        if (!uye) return null;
        Database.find({activity: true, Type: "VOICE-MUTE"}, async (err, vmuteliler) => {
          if ((!vmuteliler) || (vmuteliler.length < 1)) return null;
          if (vmuteliler.some(x => x.victimID === uye.id)) {
            let d = vmuteliler.find(x => x.victimID === uye.id);
            if (Date.now() >= d.finishDate) {
              uye.voice.setMute(false);
              d.activity = false;
              d.save();
            } else if ((uye.voice.channel) && (!uye.voice.serverMute)) {
              uye.voice.setMute(true);
            };
          };
        });

    }
    },


    module.exports.reqEv = {
        event: "voiceStateUpdate",
        isim: "Voice State Ayarları"
    };