"use strict";
//Module Init
const { MessageEmbed, MessageAttachment, Client, Collection } = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
//Ayar Init
const settings = require('./ayarlar.json');
const mongoose = require('mongoose')
const logs = require('discord-logs');
const { Console } = require("console");
const client = new Client({ fetchAllMembers: true }); // Bütün Üyeleri Çekmesi İçin Members Intenti açmayı unutmayın.
global.client = client;
logs(client)


client.Snipe = new Set()
//Command Handler
client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./Commands/", (err, aru) => {
    if (err) return console.error(err);
    aru = aru.filter(shinoa => shinoa.endsWith('.js'));
    if (aru.length == 0) return;
    console.log(`----------------${aru.length} Komut Yüklemeye Geçiliyor ----------------`)
    aru.forEach(shinoa => {
        let page = require(`./Commands/${shinoa}`);
        if (!page.commandSettings) return console.log(`Bir komutun commandSettings'i doğru ayarlanmadığı için yüklenemedi.`);
        client.commands.set(page.commandSettings.name, page);
        console.log(`====>  [COMMAND] ${page.commandSettings.name} isimli komut yüklendi.`);
        if (page.commandSettings.aliases.length > 0) {
            page.commandSettings.aliases.forEach(prx => {
                client.aliases.set(prx, page.commandSettings.name);
            });
        };
    });
});
//Event Handler
fs.readdir("./Events/", (err, Shinoa) => {
    if (err) return console.error(err);
    Shinoa = Shinoa.filter(aru => aru.endsWith(".js"));
    if (Shinoa.length == 0) return;
    console.log(`-----------------${Shinoa.length} Eventlere Yüklemeye Geçiliyor ----------------`)

    Shinoa.forEach(aru => {
        let page = require(`./Events/${aru}`);
        if (!page.reqEv) return console.log(`Bir event'in reqEv kısmı doğru bir şekilde ayarlanmadığı için yüklenemedi.`);
        if (page.reqEv.isim) console.log(`====> [EVENT] ${page.reqEv.isim} isimli event yüklendi.`);
        client.on(page.reqEv.event, page);
    });
});

require("./Helper/mongooseConnect.js")(mongoose,settings)


  client.favoriRenkler = new Array("#2f3136");

  Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };






Array.prototype.chunk = function(chunk_size) {
  let myArray = Array.from(this);
  let tempArray = [];
  for (let index = 0; index < myArray.length; index += chunk_size) {
    let chunk = myArray.slice(index, index + chunk_size);
    tempArray.push(chunk);
  };
  return tempArray;
};



client.toDate = date => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};


  
client.format = sure => {
  return moment.duration(sure).format("D [gün,] H [saat,] m [dakika,] s [saniye.]");
};

client.moment = sure => {
  return moment(sure).format("HH:mm:ss");
};
client.yasaklıtag = []
client.evet = ("<a:spankeronay:844186230551347201>")
client.red = ("<a:spankeriptal:844186231612244009>")


client.login(settings.botSettings.botToken).then(x => console.log(`Bot başarıyla giriş yaptı!`)).catch(err => console.log(`Bot giriş hatası! Yanlış token olabilir: ${err}`));

const rollogg = require('./Models/rolLogModel.js');
const { embedCreator, logEmbed } = require('./functions');

let data = require('./Models/komutEngel.js')

client.log = require('./Helper/logger')
   client.yolla = async(mesaj, msg, kanal) => {
    if (!mesaj || typeof mesaj !== "string") return
    const embd = new MessageEmbed()
      .setAuthor(msg.tag, msg.displayAvatarURL({ dynamic: true }))
      .setColor(renkTuret())
      .setDescription(mesaj)
    kanal.send(embd).then(msg => {
      msg.delete({ timeout: 15000 })
    })
      .catch(console.error);
  }
  client.blockedFromCommand = []
  client.commandBlock = new Map()
  client.engelli = new Map()

  client
  .on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
  .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));


process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Promise Hatası: ", err);
});


client.renk = ["#de162d","#b30435","#6b0038","#9e0e59","#2d0145"]
client.randomColor = function () {
  return 
};

function renkTuret(){
  let sayilar = "0123456789ABCDEF";
  let tag = "#";
  for(let i=0; i < 6; i++){
   tag += sayilar[Math.floor(Math.random() * 15)]
  }
return tag;
}

client.snipe = new Map()


client.splitEmbedWithDesc = async function(description, author = true, footer = true, features = true) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};








let a = [
"Harikasın Balım!",
"Manitan yoksa benim olsana :pleading_face:",
"Ben Güneş sen dünya olsan ama sana asla bakmasam...",
"Güzelliğin güneşten daha parlak.",
"Selaam",
"Dünyada ki en sinsi insansın!",
"Benim olmak ister misin??",
"Şerefsizsin.",
"Kedi olsan yine sana bakmam.",
"KEKW!",
"Anime izlemeyi sever misin????",
"Aşkımsın 🖤🤎🤍💜💛💚💙",
"Çok aptalsın.",
"Bügün mutsuzum biliyor musun?",
" 'Hayatım olmak ister misin' demek isterdim ama hayatımda kötülere yer yok. ",
"Shinoa senden daha akıllı!",
"Tagımız neydi bizim unuttumda yazar mısın??",
"Tanışalımmı?",
"Seni korumaya almışlar taş gibi olduğun için,doğrumu?",
"Bügün çok harikayim.",
"Mutlu bir sabaha uyandım.",
"Aptallıkta zirvedesin yine...",
"Dünyada bulunmayacak kadar güzelsin. :heart_eyes:",
"Çok Zekisin",
"Beyin ister misin lazım olr blki"
]
