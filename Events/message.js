const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const CoolDown = new Map();
const ms = require('ms'),
data = require('../Models/komutEngel.js');
const { findOne } = require('../Models/komutEngel.js');
module.exports = message => {
const prefix = [".","!","/"]

    let client = message.client;
if(!prefix.some(x => message.content.startsWith(x))) return
    let komut = message.content.split(" ")[0].slice(1);
    let args = message.content.split(" ").slice(1);
    if (message.channel.type == "dm" && cmd.commandSettings.guildOnly) return;

    let cmd;
    if (client.commands.has(komut)) {
        cmd = client.commands.get(komut);
    } else if (client.aliases.has(komut)) {
        cmd = client.commands.get(client.aliases.get(komut));
    } else {
        return;
    }

    let author = message.guild.member(message.author);
    let victim = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(client.blockedFromCommand.includes(message.author.id)) return
    let owners = ["820361956644093972","461212138346905600"]
    if (!owners.includes(message.author.id)) {

    
        let blockArr = client.commandBlock.get(message.author.id) || []
        let datax = {
            içerik: message.content,
            kanal: message.channel.name,
            komut: cmd.commandSettings.name
          }
          blockArr.push(datax)
        client.commandBlock.set(message.author.id, blockArr)
        if (blockArr.length == 5) {
            message.channel.send(`${message.author}` + "```⛔ Komut kullanımın kötüye kullandığın için engellendi.Açtırmak için " + "' Spanker#1956" + " kişisine ulaşman gerekiyor...```")
            client.channels.cache.get("844516648395472897").send(`**${message.author.tag}** - ${message.author}(\`${message.author.id}\`) komut engeli yedi.Komut kullanım özeti:\n\`\`\`${blockArr.map(x => x.içerik).join("\n")}\nKullandığı komutlar: ${blockArr.map(x => x.komut).join(",")}\nKullandığı kanallar: ${blockArr.map(x => x.kanal).join(",")}\`\`\``)
            client.blockedFromCommand.push(message.author.id)
            data.findOne({guild: message.guild.id},(err,res) => {
                if(!res) {
                    new data({guild: message.guild.id,engel: [message.author.id]}).save()
                } else {
                    res.engel.push(message.author.id)
                    res.save()
                }
            })
            
        }

        setTimeout(() => { if (client.commandBlock.has(message.author.id)) { client.commandBlock.delete(message.author.id) } }, ms("1m"))

    



    }
    client.channels.cache.get("844516688102948884").send(`:zap: \`${message.author.tag}\` kişisi \`${message.channel.name}\` adlı kanalda \`${cmd.commandSettings.name}\` komutunu kullandı \n Komutun İçeriği => \`${message.content}\` `,{ignoreDirect: false})
    cmd.run(client, message, args, author, victim);
    client.log.log(`${message.author.tag
    } (${message.author.id}) komut kullandı "${cmd.commandSettings.name}" kullandığı kanal ${message.channel.name}`)

}


module.exports.reqEv = {
    event: "message",
    isim: "Message Command Handler"
};