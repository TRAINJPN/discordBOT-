const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`ログイン成功：${client.user.tag}`);
});

client.login('MTQwMzM1MjU0ODc5ODEwNzY5OA.GfG8K5.CWbWF3RBJEXW1ndqF8O_27UCr_r0D40gBwnBrY'); // ←ここを自分のBotトークンに書き換える！