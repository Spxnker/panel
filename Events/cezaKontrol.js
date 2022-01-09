const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require("../Models/ExecutorModel.js");
const {setRoles} = require("../functions.js");
const { utimesSync } = require('fs');
module.exports = async() => {

async function Tempjail() {
    let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID)

Database.find({guildID: guild.id, activity: true,Type: "JAIL"},async function(err,jailData) {
    if ((!jailData) || (jailData.length < 1)) return null;
    for (var tempjailler of jailData) {
        let user = guild.members.cache.get(tempjailler.victimID)
        if(!user)  return null
if(Date.now() >= tempjailler.finishDate) {
if(user.roles.cache.has(ayarlar.guildRoles.jailRole)) {
setRoles(user.id, ayarlar.guildRoles.unregister)
    tempjailler.activity = false
    tempjailler.save()
}
} else {
    if(!user.roles.cache.has(ayarlar.guildRoles.jailRole)) {
        setRoles(user.id, ayarlar.guildRoles.jailRole)
    
}
}
    }
})
}

async function Tempmute() {
    let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID)

    Database.find({guildID: guild.id, activity: true,Type: "MUTE",Temporary: true},async function(err,jailData) {
        if ((!jailData) || (jailData.length < 1)) return null;
        for (var tempjailler of jailData) {
            let user = guild.members.cache.get(tempjailler.victimID)
            if(!user)  return null
    if(Date.now() >= tempjailler.finishDate) {
    if(user.roles.cache.has(ayarlar.guildRoles.muteRole)) {
        user.roles.remove(ayarlar.guildRoles.muteRole)}
        tempjailler.activity = false
        tempjailler.save()
    } else {
        if(!user.roles.cache.has(ayarlar.guildRoles.muteRole)) {
       user.roles.add(ayarlar.guildRoles.muteRole)
        }
    
    }
        }
    })
    
    }


    async function voice() {
        let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID)
    
        Database.find({guildID: guild.id, activity: true,Type: "VOICE-MUTE",Temporary: true},async function(err,jailData) {
            if ((!jailData) || (jailData.length < 1)) return null;
            for (var tempjailler of jailData) {
                let user = guild.members.cache.get(tempjailler.victimID)
                if(!user)  return null
        if(Date.now() >= tempjailler.finishDate) {
        if(user.roles.cache.has(ayarlar.guildRoles.vmuteRole)) {
            user.roles.remove(ayarlar.guildRoles.vmuteRole)
            tempjailler.activity = false
            tempjailler.save()
        }
            if(user.voice.channel) user.voice.setMute(false)


        } else {
            if(!user.roles.cache.has(ayarlar.guildRoles.vmuteRole)) {
           user.roles.add(ayarlar.guildRoles.vmuteRole)
           if(user.voice.channel) user.voice.setMute(true)
            }
        }
        
            }
        })
        
        }


async function tagsC() {
    let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID)
let tagli = guild.members.cache.array().filter(x => (x.user.username.includes(ayarlar.guildSettings.tag)) && (x => !x.roles.cache.has(ayarlar.reg.familyRole))).map(gmember => gmember.id);
let tagsiz = guild.members.cache.array.filter( x=> (x => !x.user.username.includes(ayarlar.guildSettings.tag)) && (x => x.roles.cache.has(ayarlar.reg.familyRole))).map(gmember => gmember.id);

if (tagliUyeler.length >= 1) {

for(uye of tagli) {
    let user = guild.members.cache.get(uye)
    await user.roles.add(ayarlar.reg.familyRole).catch(() => { });
}
if (tagsiz.length >= 1) {

for(uye of tagsiz) {
    let user = guild.members.cache.get(uye)
    await user.roles.remove(ayarlar.reg.familyRole).catch(() => { });
}
}

}

}


async function ytagKontrol() {
    const data = require('../Models/yasakliTag.js')
    let guilddd = client.guilds.cache.get(ayarlar.guildSettings.guildID)
    await data.findOne({ guild: guilddd.id }, async (err, res) => {
        if (!res) return 

        res.taglar.forEach(x => {
            let üye = guilddd.members.cache.filter(mems => {
                return mems.user.username.includes(x) && !mems.roles.cache.has(ayarlar.yasakliTag.yasakliTagRole)
            })
üye.forEach(x => {
setRoles(x.id,ayarlar.yasakliTag.yasakliTagRole)

})
            
        })


    })
}


setInterval(() => {
Tempjail()
},20*1000)


setInterval(() => {
    Tempmute()
    },10000)
 
    setInterval(() => {
        voice()
        },30000)
            
setInterval(() => {
    ytagKontrol()
    client.channels.cache.get(ayarlar.botSettings.botVoiceChannel).join()

}, 1000*60*10);


    },
    module.exports.reqEv = {
        event: "ready",
        isim: "Users Kontrol"
    };