const mongoose = require("mongoose");
const {guildName} = require('../ayarlar.json').guildSettings

module.exports = mongoose.model(guildName+"yasaklıTag", new mongoose.Schema({
    guild: String,
  taglar: Array
}));