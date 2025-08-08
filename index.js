require('dotenv').config(); // ← 最初に追加
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`ログイン成功：${client.user.tag}`);

  // ステータス設定
  client.user.setPresence({
    status: 'online',
    activities: [
      {
        name: 'みんなのメッセージ',
        type: ActivityType.Watching,
      },
    ],
  });

  // 毎週土曜の朝7:00にメッセージ送信（日本時間）
  cron.schedule('0 7 * * 6', () => {
    const channel = client.channels.cache.get('123456789012345678'); // ←ここはあなたのチャンネルID！
    if (channel) {
      channel.send('おはようございます！☀️');
    } else {
      console.log('チャンネルが見つかりませんでした');
    }
  }, {
    timezone: 'Asia/Tokyo'
  });
});

client.login(process.env.TOKEN);
