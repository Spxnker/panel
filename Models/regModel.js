const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings

const register = mongoose.Schema({
guildID: String,
execID: String,
victimID: String,
erkek:{type: Number, default: 0},
kari: {type: Number, default: 0},
nicknames: Array
});

module.exports = mongoose.model( guildName + "register", register);