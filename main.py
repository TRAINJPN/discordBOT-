import json
import discord
from discord import app_commands
import os
from flask import Flask

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

    announcement_channels = announcement_channels()


    if not check_birthdays.is_running():
        check_birthdays.start()

    if not update_status_loop.is_running():
        update_status_loop.start()

    await do_update_status()

    try:
        await bot.tree.sync()
        await send_log(bot, "コマンドを同期しました")
    except Exception as e:
        print(f"コマンドの同期に失敗: {e}")
        await send_log(bot, f"コマンドの同期に失敗: {e}")

    print(f"{bot.user} としてログインしました")
    await send_log(bot, f"{bot.user} としてログインしました")
