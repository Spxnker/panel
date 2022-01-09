const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings

const penal = mongoose.Schema({
guildID: String,
execID: String,
Ban: {Type: Number, default: 0},
Jail: {Type: Number, default: 0},
Mute: {Type: Number, default: 0},
Vmute: {Type: Number, default: 0}

});

module.exports = mongoose.model( guildName +"cezakayit", penal);