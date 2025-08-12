import json
import discord
from discord import app_commands
from discord.ext import commands
import os
from flask import Flask
import threading
import requests
import time

app = Flask('')

@app.route('/')
def home():
    return """
    <html>
      <head><title>[Beta]AdminPlus稼働状況</title></head>
      <body style="font-family: '游ゴシック', YuGothic, sans-serif; text-align: center; margin-top: 50px;">
        <h1> 桜咲市公式BOTは現在稼働中です。</h1>
        <p>問題なく稼働しています。</p>
      </body>
    </html>
    """

def run():
    app.run(host='0.0.0.0', port=8080)

def ping_loop(url):
    while True:
        try:
            response = requests.get(url, timeout=10)
            print(f'Pinged {url}: {response.status_code}')
        except Exception as e:
            print(f'Ping error: {e}')
        time.sleep(300)

# Flask起動用スレッド
threading.Thread(target=run).start()

# 自動Pingスレッド
threading.Thread(
    target=ping_loop,
    args=('https://discordbot-ufkt.onrender.com',),
    daemon=True
).start()

TOKEN = os.environ.get('DISCORD_BOT_TOKEN')
if not TOKEN:
    print("エラー: 環境変数 DISCORD_BOT_TOKEN が設定されていません。")
    exit(1)

intents = discord.Intents.all()
bot = commands.Bot(command_prefix="!", intents=intents, help_command=None)
tree = bot.tree

class ServerInfo(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

announcement_channels = {}

def load_announcement_channels():
    try:
        with open("announcement_channels.json", "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"ファイル読み込みエラー: {e}")
        return {}

def save_announcement_channels():
    with open("announcement_channels.json", "w") as f:
        json.dump(announcement_channels, f, indent=4)

@bot.event
async def on_ready():
    global announcement_channels

    announcement_channels = load_announcement_channels()

    if not check_birthdays.is_running():
        check_birthdays.start()

    if not update_status_loop.is_running():
        update_status_loop.start()

    await do_update_status()

    try:
        await bot.tree.sync()
        
    except Exception as e:
        print(f"コマンドの同期に失敗: {e}")

    print(f"{bot.user} としてログインしました")
