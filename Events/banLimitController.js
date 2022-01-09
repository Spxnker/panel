const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/banLimit.js')

module.exports = async() => {

setInterval(() => {
    Database.deleteMany({}).then(x => console.log("Saatlik Ban Limitler Sıfırlandı!"))
}, 60*1000*60);


    },


    module.exports.reqEv = {
        event: "ready",
        isim: "Ban Limit"
    };