from aiogram import Bot
from aiogram.types import Update

from bot.database.operations.user.getters import get_user
from bot.locales.texts import Texts


async def handle_connection_error(bot: Bot, telegram_update: Update):
    user_id = None
    if telegram_update.callback_query and telegram_update.callback_query.from_user.id:
        user_id = str(telegram_update.callback_query.from_user.id)
    elif telegram_update.message and telegram_update.message.from_user.id:
        user_id = str(telegram_update.message.from_user.id)

    if user_id:
        user = await get_user(user_id)
        if user:
            await bot.send_message(
                chat_id=user.id,
                text=Texts.CONNECTION_ERROR,
            )
