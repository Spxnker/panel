const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
 

    function ortalama(array) {
        if(array.length <= 0) return 0;
        const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
        return average(array).toFixed();
      };

      let members = message.guild.members.cache;
      let genel = members.filter(member => member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1])).map(member => Number(member.nickname.split('| ')[1]));
      let erkek = members.filter(member => ayarlar.reg.erkekRoles.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
      let kiz = members.filter(member => ayarlar.reg.kariRoles.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
      let tagli = members.filter(member => member.roles.cache.has(ayarlar.reg.familyRole) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));




embedCreator("dsa",`
Merhaba \`${message.member.displayName}\` aşşağıda ${message.guild.name} sunucusun yaş ortalaması gösterilmektedir!
\`\`\`diff

+ Sunucuda bulunan tüm insaüyelerinların yaş ortalaması;
> ${ortalama(genel)}
+ Sunucudaki taglı üyelerin yaş Ortalaması;
> ${ortalama(tagli)}
+ Sunucudaki erkek üyelerin yaş ortalaması;
> ${ortalama(erkek)}
+ Sunucudaki bayan/kız üyelerin yaş ortalaması
> ${ortalama(kiz)}
\`\`\`

`,message,[true, 30000])
}

exports.commandSettings = {
    name: "ortalama",
    aliases: ["yaş-ortalaması"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "ortalama"
}