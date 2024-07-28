from aiogram import Bot
from aiogram.types import BotCommand

commands = [
    BotCommand(
        command="start",
        description="👋 Что умеет этот бот",
    ),
    BotCommand(
        command="help",
        description="🛟 Помощь",
    ),
]


async def set_commands(bot: Bot):
    await bot.set_my_commands(commands=commands)
