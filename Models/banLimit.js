const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings

const penal = mongoose.Schema({
guildID: String,
execID: String,
limit: {Type: Number, default: 0}
});

module.exports = mongoose.model(guildName + "banlimit", penal);