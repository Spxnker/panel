const { Collection, MessageAttachment, MessageEmbed, Message, ReactionEmoji } = require("discord.js")
const settings = require("./ayarlar.json");

/**
 * Bir minimum ve maximum değer arası sayı seçin (Min, Max dahil).
 * @param {number} Minimum Minimum Değer
 * @param {number} Maximum Maximum Değer
 * @returns {number} Girilen sayılar arası rastgele bir değer döndürür.
 */
function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Güzel bir renk için fonksiyon. 0 rastgele renk döndürür. Yeşil için 1, Kırmızı için 2.
 * @param {number} Renk 0 ila 10 arası bir sayı.
 * @returns {string} Bir hex renk kodu döndürür.
 */
function renk(color = 0) {
    let ozzydex = 0;
    if (color > 0) ozzydex = color - 1;
    if (color < 0) ozzydex = randomSayi(0, 9);
    if (color == 0) ozzydex = randomSayi(0, 9);
    if (color > 10) ozzydex = randomSayi(0, 9);
    const renkler = ["#88B04B", "#FF6F61", "#6B5B95", "##88B04B", "#B565A7", "#009B77", "#939597", "#FFA500", "#B89B72", "#6A2E2A"];
    return renkler[ozzydex];
}

async function rolVer(memberID, rolID) {
    if (Array.isArray(rolID) == false) rolID = [rolID];
    const guild = client.guilds.cache.get(settings.guildSettings.guildID) || client.guilds.cache.first();
    if (!guild) return console.log(`Guild ID bulunamadı! Lütfen ayarlar dosyanızı düzgün doldurun.`);
    let member = await guild.members.cache.get(memberID);
    if(!member) return

    rolID.forEach(async(ozzy, index) => {
        setTimeout(async() => {
            await member.roles.add(ozzy).catch(shinoa => console.log(`Rol Verme Hatası: ${shinoa}`))
        }, 1000)
    });

};

async function rolAl(memberID, rolID) {
    if (Array.isArray(rolID) == false) rolID = [rolID];
    const guild = client.guilds.cache.get(settings.guildSettings.guildID) || client.guilds.cache.first();
    if (!guild) return console.log(`Guild ID bulunamadı! Lütfen ayarlar dosyanızı düzgün doldurun.`);
    let member = await guild.members.cache.get(memberID) || client.users.fetch(memberID);
    if(!member) return
    rolID.forEach(async(ozzy, index) => {
        setTimeout(async() => {
            await member.roles.remove(ozzy).catch(shinoa => console.log(`Rol Vermelma Hatası: ${shinoa}`))
        }, 1000)
    });

};

function embedCreator(color,desc,bsm,thendelete,chn) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
    let user;
    if(bsm.member) {
        user = bsm.member.user;
    } else {
        user = bsm;
    }
    chn = guild.channels.cache.get(chn) || bsm.channel;
    let shinoa = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor(renkTuret())
        .setDescription(desc);
    if(!thendelete[0]) {
        chn.send(shinoa);
    } else {
        chn.send(shinoa).then(x => x.delete({timeout: thendelete[1]}))
    }
}

function removeA(arr){
    var what, a = arguments, L = a.length, ax;
    while(L > 1 && arr.length){
        what = a[--L];
        while((ax=arr.indexOf(what)) !==-1){
            arr.splice(ax, 1)
        }
        return arr;
    }
};

function trueEmbed(message,text) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
let user 
if(message.member) {
user = message.member.user;
} else {
    user = message
}
chn = message.channel

const shx = new MessageEmbed()
    .setColor(renkTuret())
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
.setDescription(`${client.red} **Tüm argümanları doğru doldurunuz!**  \`.${text}\` `)
    chn.send(shx).then(x => x.delete({timeout: 10000}))
    message.react(settings.emojiler.red)
}

function permEmbed(message) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
let user 
if(message.member) {
user = message.member.user;
} else {
    user = message
}
chn = message.channel
    const shx = new MessageEmbed()
    .setColor(renkTuret())
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
.setDescription(`${client.red} Bu komutu kullanabilmek için geçerli yetkiye sahip değilsin!`)
    chn.send(shx).then(x => x.delete({timeout: 10000}))
    message.react(settings.emojiler.red)
    message.react(settings.emojiler.red)

}

    async function setRoles(memberID, rolID) {
        const guild = client.guilds.cache.get(settings.guildSettings.guildID);

        if (Array.isArray(rolID) == false) rolID = [rolID];
        if (!guild) return console.log(`Guild ID bulunamadı! Lütfen ayarlar dosyanızı düzgün doldurun.`);
        let victim = await guild.members.cache.get(memberID);
    if(!victim) return console.log("hm")
        setTimeout(async () => {
    let booster = settings.guildRoles.boosterRole
if(victim.roles.cache.has(booster)) {
    let a = rolID.concat(booster)
victim.roles.set(a)
} else {
victim.roles.set(rolID)
}
        },100)

    }

function positionEmbed(message) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
let user 
if(message.member) {
user = message.member.user;
} else {
    user = message
}
chn = message.channel

const shx = new MessageEmbed()
    .setColor(renkTuret())
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
.setDescription(`${client.red} **Kendinden üst yetkide birine işlem uygulayamazsın**`)
    chn.send(shx).then(x => x.delete({timeout: 10000}))
    message.react(settings.emojiler .red)
}

    function botEmbed(message) {
        const guild = client.guilds.cache.get(settings.guildSettings.guildID);
    let user 
    if(message.member) {
    user = message.member.user;
    } else {
        user = message
    }
    chn = message.channel

    const shx = new MessageEmbed()
        .setColor(renkTuret())
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
    .setDescription(`${client.red} Belirttiğin kullanıcı bot olduğu için işlem yapamıyorum!`)

        chn.send(shx).then(x => x.delete({timeout: 10000}))
        message.react(settings.emojiler.red)
    }

function cezaEmbed(message) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
let user 
if(message.member) {
user = message.member.user;
} else {
    user = message
}
chn = message.channel

const shx = new MessageEmbed()
    .setColor(renkTuret())
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
.setDescription(`${client.red} **Bu kişinin hali hazırda cezası bulunuyor!**`)
    chn.send(shx).then(x => x.delete({timeout: 10000}))
    message.react(settings.emojiler.red)
}

function banEmbed(color,desc,bsm,thendelete,chn) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
    let user;
    if(bsm.member) {
        user = bsm.member.user;
    } else {
        user = bsm;
    }
    chn = guild.channels.cache.get(chn) || bsm.channel;
    let oziemb = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setFooter(settings.botSettings.setFooter, user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor(renkTuret())
        .setDescription(desc)
        .setImage("https://media.discordapp.net/attachments/788489815213211698/789832009249587240/00648c6786aedeaf2d9b401e17dc7fe7.gif");
    if(!thendelete[0]) {
        chn.send(oziemb);
    } else {
        chn.send(oziemb).then(x => x.delete({timeout: thendelete[1]}))
    }
}

function logEmbed(color,desc,bsm,thendelete,chn) {
    const guild = client.guilds.cache.get(settings.guildSettings.guildID);
    let user;
    if(bsm.member) {
        user = bsm.member.user;
    } else {
        user = bsm;
    }
    chn = guild.channels.cache.get(color) || bsm.channel;
    let oziemb = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setFooter("Detaylı Bilgi için => cezainfo [Ceza ID]")
        .setColor(renkTuret())
        .setDescription(desc)
 color.send(oziemb)
}


function renkTuret(){
    let sayilar = "0123456789ABCDEF";
    let tag = "#";
    for(let i=0; i < 6; i++){
     tag += sayilar[Math.floor(Math.random() * 15)]
    }
  return tag;
  }

  async function pushEmbed(mesaj, kanal) {
    let embedBuyukluk = parseInt(`${mesaj.length/2048}`.split('.')[0])+1
   const yenisi = [];
     for (let mevcutu of embedBuyukluk) { 
   let mesaji = mesaj.split("").splice(i*2048, (i+1)*2048)
   let doldur = new Discord.MessageEmbed().setDescription(mesaji.join("\n"))
       yenisi.push(doldur)
client.channels.cache.get(kanal).send(yenisi);
     }
   }

module.exports.randomSayi = randomSayi;
module.exports.renk = renk;
module.exports.rolVer = rolVer;
module.exports.rolAl = rolAl;
module.exports.embedCreator = embedCreator;
module.exports.removeA = removeA;
module.exports.trueEmbed = trueEmbed;
module.exports.permEmbed = permEmbed;
module.exports.setRoles = setRoles;
module.exports.positionEmbed = positionEmbed;
module.exports.botEmbed = botEmbed;
module.exports.cezaEmbed = cezaEmbed;
module.exports.banEmbed = banEmbed;
module.exports.renkTuret = renkTuret;
module.exports.logEmbed = logEmbed;
module.exports.pushEmbed = pushEmbed;




