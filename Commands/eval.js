const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args,author, victim) => {

    const temizle = text => {
        if (typeof(text) === "string")
          return temizle2(text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)));
        else {
            return temizle2(text);
        }
        }
    const temizle2 = text => {
        if(text == "undefined") {
            text = "Başarıyla Executelandı. Return Promise: Undefined"
            return text;
        } else {
            return text;
        }
    }

    if (!ayarlar.botSettings.botOwners.includes(message.author.id)) return;
    if(message.content.toLowerCase().includes("token")) return;
            try {
                const code = args.join(" ");
                if(!code) return embedCreator("RED",`\`\`\`Lütfen değerlendirilmesi için geçerli bir kod giriniz.\`\`\``,message,[true,4000]);
                let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
                
                message.channel.send(temizle(evaled), {code:"xl", split: true});
              } catch (err) {
                message.channel.send(`\`HATA\` \`\`\`xl\n${temizle(err)}\n\`\`\``);
              }
        }



exports.commandSettings = {
    name: "modeval",
    aliases: ["hewal"],
    guildOnly: true, 
    coolDown: 0, 
    description: "modeval [KOD]"
}