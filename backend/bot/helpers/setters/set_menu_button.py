from aiogram import Bot
from aiogram.types import MenuButtonWebApp, WebAppInfo

from bot.config import config
from bot.locales.texts import Texts


async def set_menu_button(bot: Bot):
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text=Texts.ORDER_CAKES,
            web_app=WebAppInfo(url=config.WEB_APP_URL)
        )
    )
