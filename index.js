const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const cron = require('node-cron'); // スケジューラー
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`ログイン成功：${client.user.tag}`);

  // ステータス設定（任意）
  client.user.setPresence({
    status: 'online',
    activities: [
      {
        name: '桜咲市を監視中',
        type: ActivityType.Watching,
      },
    ],
  });

  // 🕖 毎週土曜日の朝7:00にメッセージを送信
  cron.schedule('0 7 * * 6', () => {
    const channel = client.channels.cache.get('1403384565615034579'); // ←ここを自分のチャンネルIDに！
    if (channel) {
      channel.send('おはようございます！☀️');
    } else {
      console.log('チャンネルが見つかりませんでした');
    }
  }, {
    timezone: 'Asia/Tokyo' // ⏰ 日本時間で実行
  });

});

client.login('MTQwMzM1MjU0ODc5ODEwNzY5OA.GqtKHw.U9p0SUwRvLY4Tv71MQ7_CsGfuqKmZQ-NhfpSpY'); // ←自分のBotトークンに置き換える

