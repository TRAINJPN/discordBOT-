const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`ログイン成功：${client.user.tag}`);

  // 👇 ステータスを設定する
  client.user.setPresence({
    status: 'online', // 他には "idle", "dnd", "invisible" が使える
    activities: [
      {
        name: '桜咲市を監視中', // 表示したい文字
        type: ActivityType.Watching, // "Playing", "Listening", "Watching", "Competing"
      },
    ],
  });
});

client.login('MTQwMzM1MjU0ODc5ODEwNzY5OA.GqtKHw.U9p0SUwRvLY4Tv71MQ7_CsGfuqKmZQ-NhfpSpY');
