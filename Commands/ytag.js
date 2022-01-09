const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const data = require('../Models/yasakliTag.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return
    await data.findOne({ guild: message.guild.id }, async (err, res) => {
        if (args[0] == "ekle") {
            if (!args[1]) return client.yolla("Yasaklıya atmak istediğin tagı belirtmelisin.", message.author, message.channel)
            if (!res) {
                let arr = []
                arr.push(args[1])
                const newData = new data({
                    guild: message.guild.id,
                    taglar: arr
                })
                newData.save().catch(e => console.log(e))
                let üyeler = message.guild.members.cache.filter(x => {
                    return x.user.username.includes(args[1])
                })
                 client.yolla("**" + args[1] + "** tagında " + üyeler.size + " kişi bulundu hepsine yasaklı tag permi veriyorum.", message.author, message.channel)
                client.yasaklıtag.push(args[1])
                üyeler.map(x => {
                    setTimeout(() => {
                       setRoles(x.id,ayarlar.yasakliTag.yasakliTagRole)
                    }, 1000)
                })
            } else {
                let taglar = res.taglar
                if (taglar.includes(args[1])) return client.yolla("Yasaklıya atmak istediğin tag veritabanında zaten yasaklı.", message.author, message.channel)
                res.taglar.push(args[1])
                res.save().catch(e => console.log(e))
                client.yasaklıtag.push(args[1])
                let üyeler = message.guild.members.cache.filter(x => {
                    return x.user.username.includes(args[1])
                })
                await client.yolla("**" + args[1] + "** tagında " + üyeler.size + " kişi bulundu hepsine yasaklı tag permi veriyorum.", message.author, message.channel)
 üyeler.forEach(x => {
    setRoles(x.id,ayarlar.yasakliTag.yasakliTagRole)

 })

            }
        }

        if (args[0] == "liste" && !args[1]) {
            if (!res)  return await embedCreator("dsa","Veri tabanında tag bulunmadığı için liste işlemini gerçekleştiremiyorum!",message,[true,30000])
            
            if(res.taglar.length < 1)  return  await embedCreator("dsa","Veri tabanında tag bulunmadığı için liste işlemini gerçekleştiremiyorum!",message,[true,30000])
            
            let num = 1
            let arrs = res.taglar.map(x => `\`${num++}.\` ${x} - (${client.users.cache.filter(s => s.username.includes(x)).size} üye)`)
            let aa = arrs ? arrs.join("\n") : "Sunucuda Yasaklı Tag bulunamadı"
            await  embedCreator("dsa",aa,message,[false])
        }

        if (args[0] == "kaldır") {
                var bulunamayanTaglar = [];

            if (!res) return await client.yolla("Veri tabanında tag bulunmadığı için kaldırma işlemini gerçekleştiremiyorum!.", message.author, message.channel)
            if (!res.taglar.includes(args[1])) return await client.yolla("Belirttiğin tag yasaklı tag listesinde bulunmuyor", message.author, message.channel)
            let üyeler = message.guild.members.cache.filter(x => {
                return x.user.username.includes(args[1])
            })
            await client.yolla("**" + args[1] + "** tagında " + message.guild.members.cache.filter(u => u.user.username.includes(args[1])).size + " kişi bulundu hepsineden yasaklı tag permini alıp sistemden tagı kaldırıyorum.", message.author, message.channel)
            res.taglar.remove(args[1]);
                        res.save().catch(e =>   (e))
                        üyeler.forEach(x => {
                            setRoles(x.id,ayarlar.guildRoles.unregister)
                        })

        }

        if (args[0] == "kontrol") {
            if (!res) return await client.yolla("Veri tabanında tag bulunmadığı için kontrol işlemini gerçekleştiremiyorum!", message.author, message.channel)
            if(res.taglar.length < 1) return await client.yolla("Veri tabanında tag bulunmadığı için kontrol işlemini gerçekleştiremiyorum!", message.author, message.channel)
            res.taglar.forEach(x => {
                let üye = message.guild.members.cache.filter(mems => {
                    return mems.user.username.includes(x) && !mems.roles.cache.has(ayarlar.yasakliTag.yasakliTagRole)
                })
                message.channel.send(`${x} tagı bulunup <@&${ayarlar.yasakliTag.yasakliTagRole}> rolü olmayan kişilere yasaklıtag rolünü veriyorum`)
üye.forEach(x => {
    setRoles(x.id,ayarlar.yasakliTag.yasakliTagRole)

})
                
            })
        }
        if(args[0] == "yardım") {
            embedCreator("lol",`
            \`•\` **.ytag-ekle [Tag]**
            \`•\` **.ytag-kaldır [Tag]**
            \`•\` **.ytag kontrol **
            \`•\` **.ytag liste **
            `,message,[true,15000])
        }
    })

 };

exports.commandSettings = {
    name: "yasakli-tag",
    aliases: ["yasakli-tag","ytag"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "yasakli-tag yardım"
}


