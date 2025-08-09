require('dotenv').config(); // .env読み込み

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`ログイン成功：${client.user.tag}`);

  // ステータス設定
  client.user.setPresence({
    status: 'online',
    activities: [
      {
        name: '24時間起動出来るかテスト中',
        type: ActivityType.Playing,
      },
    ],
  });
});

client.login(process.env.DISCORD_TOKEN); // ← envから読み込む
