const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Database = require('../Models/ExecutorModel.js')
const ms = require('ms')
const ceza = require('../Models/cezaSorgu.js')
const Register = require('../Models/regModel.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed,cezaEmbed,log, logEmbed, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    let staff = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || author
let register = await Register.findOne({guildID: message.guild.id,execID: staff.id})
if(!register) return embedCreator("dsa",`${staff} kişisinin herhangi bir verisine ulaşamadım! `,message,[true, 10000])
let erkek = register.erkek || 0
let kari = register.kari || 0
let total = register.erkek + register.kari || 0
embedCreator("dsa",`
__**Kayıt Bilgileri**__
\`•\` **Toplam Kayıt:** ${Number(erkek) + Number(kari)}
\`-\` Kadın Kayıt: ${kari || "0"}
\`-\` Erkek Kayıt: ${erkek || "0"} 

`,message,[true, 30000])


};

exports.commandSettings = {
    name: "kayıtbilgi",
    aliases: ["kayıt-bilgi","kbilgi"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "jail @Shinoa/461212138346905600 [Sebep]"
}