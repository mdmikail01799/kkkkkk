module.exports.config = {
  name: "join",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS", //fixing ken gusler
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "Nayan", "font");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "Nayan", "font");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("BOT CONNECTED!!! \n\n আসসালামু আলাইকুম \n\n adding in the group chat successfully!!!\n\n আসা করি  সবাই  ভালো আছেন।💞💞 আমি আপনাদের মাঝে  নতুন\n______________________________\n\n My profix = /\n Admin =MIKAIL\nAdmin link = https://www.facebook.com/puteri.aleesya.125\n______________________________যেকোনো অভিযোগ অথবা হেল্প এর জন্য আমার BOSS মিকাইল কে নক করতে পারেন \nhttps:/m.me/puteri.aleesya.125\n✢━━━━━━━━━━━━━━━✢\n----❖----- 𝐌𝐈𝐊𝐀𝐈𝐋 -----❖----", event.threadID, () => api.sendMessage({body:`আসসালামুআলাইকুম 💖
____________________________________
BOT CONNECTED!!! 
adding in the group chat successfully!!! আসা করি  সবাই  ভালো আছেন।💞💞 আমি আপনাদের মাঝে  নতুন💔💔❤️❤️
____________________________________\n\nযেকোনো কমান্ড দেখতে ${global.config.PREFIX}help ব্যবহার করুন
\n\উদাহারণ:\n${global.config.PREFIX}love\n${global.config.PREFIX}help\n${global.config.PREFIX}admin\n${global.config.PREFIX}info
____________________________________
যেকোনো অভিযোগ অথবা হেল্প এর জন্য আমার BOSS 
মিকাইল কে নক করতে পারেন 
👉Fb https://www.facebook.com/puteri.aleesya.125

`, attachment: fs.createReadStream(__dirname + "/Nazrul/received_578520465242295.jpeg")} ,threadID));
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "Nazrul", "font");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "🌹Assalamu alaikum 🌹\n\n {name}. আপনি এই গ্রুপের  {soThanhVien} no মেম্বার\n\n {threadName}\n\n🥀 গ্রুঁপেঁরঁ পঁক্ষঁ থেঁকেঁ আঁপঁনাঁকেঁ স্বাঁগঁতঁমঁ♥\n\n🥰🥀ᏔᎬᏞᏟϴᎷᎬ 🥀🥰 \n        ┌────♣─────┐\n        😘♦ 𝐌𝐈𝐊𝐀𝐈𝐋 ♦😘\n        └────♣─────┘\n \n✢━━━━━━━━━━━━━━━✢\n ----❖----- 𝐌𝐈𝐊𝐀𝐈𝐋 -----❖----" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "Nazrul", "font"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "Nazrul", "font", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
        }
