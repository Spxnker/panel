const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings
const penal = mongoose.Schema({
mesajlar: {Type: Array, default: []
}
});

module.exports = mongoose.model("randomMessage", penal);