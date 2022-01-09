const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings

const register = mongoose.Schema({
Rol: String,
ExecID: String,
kisiID: String,
emoji: String,
date: {type: Number, default: Date.now()},
victimID: String
});

module.exports = mongoose.model(guildName +"rollog", register);