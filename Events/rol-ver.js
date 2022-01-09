const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const CoolDown = new Map();
const ms = require('ms'),
data = require('../Models/komutEngel.js');
const { findOne } = require('../Models/komutEngel.js');
const { permEmbed,embedCreator } = require('../functions');
module.exports = message => {
const prefix = [".","!","/"]
let client = message.client;
if (message.author.bot || message.channel.type === "dm") return;
let komut = [
  {name: ["terapist"], role: '839091722671226897',aliases: []},
  {name: ["sorun-çözücü"], role: '839091722671226896',aliases: ["sç"]},
  {name: ["streamer"], role: '839091722650517550',aliases: []},
  {name: ["müzisyen"], role: '844179263665864754',aliases: ["muzisyen"]},
  {name: ["degisner"], role: '839091722650517545',aliases: ["software"]},
  {name: ["vokal"], role: '839091722641211451',aliases: []},
  {name: ["ressam"], role: '839091722641211450',aliases: []},
  {name: ["dancer"], role: '839091722641211449',aliases: []},
  {name: ["vip"], role: '844179267474554880',aliases: []},
  {name: ["lovers"], role: '844179286725230592',aliases: []},
  {name: ["shinoa"], role: '839947536802512946',aliases: []}

];
if(!prefix.some(x => message.content.startsWith(x))) return
    let command = message.content.split(" ")[0].slice(1);
    let args = message.content.split(" ").slice(1);




let aliasess = komut.find(x=> x.aliases.includes(command));
var cmd = komut.find(x=> x.name == command);

if (cmd) {
if(["839091722716708897"].some(x => !message.member.roles.cache.has(x)) && !message.member.hasPermission("MANAGE_ROLES")) return permEmbed(message)
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!victim || message.mentions.members.size < 1 && isNaN(args[0])) return embedCreator("dsa",`${client.red} **Tüm argümanları doğru doldurunuz!** \`.${cmd.name} @Shinoa/461212138346905600\` `,message,[true,15000])

  if (!victim.roles.cache.has(cmd.role)) {
    victim.roles.add(cmd.role).catch(e => {});
    message.react(ayarlar.emojiler.onay)
    return embedCreator("dsa",`${client.evet} ${victim} üyesine <@&${cmd.role}> rolü verildi.`,message,[true,15000])
    
  } else {
    victim.roles.remove(cmd.role).catch(e => {});
    message.react(ayarlar.emojiler.onay)

    return     embedCreator("dsa",`${client.evet} ${victim} üyesinden <@&${cmd.role}> rolü alındı..`,message,[true,15000])
  };
} else if(aliasess) {
    if(["839091722716708897"].some(x => !message.member.roles.cache.has(x)) && !message.member.hasPermission("MANAGE_ROLES")) return permEmbed(message)
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!victim || message.mentions.members.size < 1 && isNaN(args[0])) return embedCreator("dsa",`${client.red} **Tüm argümanları doğru doldurunuz!** \`.${aliasess.name} @Shinoa/461212138346905600\` `,message,[true,15000])

    if (!victim.roles.cache.has(aliasess.role)) {
      victim.roles.add(aliasess.role).catch(e => {});
      message.react(ayarlar.emojiler.onay)
      return embedCreator("dsa",`${client.evet} ${victim} üyesine <@&${aliasess.role}> rolü verildi`,message,[true,15000])

    } else {
      victim.roles.remove(aliasess.role).catch(e => {});
      message.react(ayarlar.emojiler.onay)
      return embedCreator("dsa",`${client.evet} ${victim} üyesinden <@&${aliasess.role}> rolü alındı.`,message,[true,15000])
     

    };
} 

}


module.exports.reqEv = {
    event: "message",
    isim: "Message Command Handler"
};