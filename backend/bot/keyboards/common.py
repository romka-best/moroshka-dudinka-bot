from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from bot.config import config
from bot.locales.texts import Texts


def build_start_keyboard() -> InlineKeyboardMarkup:
    buttons = [
        [
            InlineKeyboardButton(
                text=Texts.ORDER_CAKES,
                web_app=WebAppInfo(url=config.WEB_APP_URL),
            )
        ]
    ]

    return InlineKeyboardMarkup(
        inline_keyboard=buttons,
    )
