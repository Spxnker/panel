const { Activity } = require('discord.js');
const mongoose = require('mongoose');
const {guildName} = require('../ayarlar.json').guildSettings

const penal = mongoose.Schema({
guild: String,
engel: Array
});

module.exports = mongoose.model( guildName +"blacklist", penal);