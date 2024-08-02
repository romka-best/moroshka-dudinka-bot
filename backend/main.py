import asyncio
import logging
import os
from contextlib import asynccontextmanager

import uvicorn
from aiogram.client.default import DefaultBotProperties
from aiogram.exceptions import TelegramNetworkError, TelegramForbiddenError
from fastapi import FastAPI
from aiogram import Bot, Dispatcher, types
from aiogram.enums.parse_mode import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.fsm.strategy import FSMStrategy

from bot.api.admin import admin_router
from bot.api.cart import cart_router
from bot.api.order import order_router
from bot.api.product import product_router
from bot.api.user import user_router
from bot.database.main import firebase
from bot.handlers.common_handler import common_router
from bot.helpers.handlers.handle_connection_error import handle_connection_error
from bot.helpers.handlers.handle_forbidden_error import handle_forbidden_error
from bot.helpers.handlers.handle_network_error import handle_network_error
from bot.helpers.setters.set_menu_button import set_menu_button
from bot.helpers.setters.set_description import set_description
from bot.middlewares.LoggingMiddleware import LoggingMessageMiddleware
from bot.config import config

WEBHOOK_BOT_PATH = f"/bot/{config.BOT_TOKEN.get_secret_value()}"

WEBHOOK_BOT_URL = config.WEBHOOK_URL + WEBHOOK_BOT_PATH

bot = Bot(
    token=config.BOT_TOKEN.get_secret_value(),
    default=DefaultBotProperties(
        parse_mode=ParseMode.HTML,
    ),
)
storage = MemoryStorage()
dp = Dispatcher(storage=storage, sm_strategy=FSMStrategy.GLOBAL_USER)


@asynccontextmanager
async def lifespan(_: FastAPI):
    webhook_info = await bot.get_webhook_info()
    if webhook_info.url != WEBHOOK_BOT_URL:
        await bot.set_webhook(url=WEBHOOK_BOT_URL)

    dp.include_routers(common_router)

    dp.message.middleware(LoggingMessageMiddleware())

    await set_description(bot)
    await set_menu_button(bot)
    await firebase.init()
    yield
    await bot.session.close()
    await storage.close()
    await firebase.close()


app = FastAPI(lifespan=lifespan)
app.include_router(admin_router, prefix='/api/v1')
app.include_router(cart_router, prefix='/api/v1')
app.include_router(order_router, prefix='/api/v1')
app.include_router(product_router, prefix='/api/v1')
app.include_router(user_router, prefix='/api/v1')


@app.post(WEBHOOK_BOT_PATH)
async def bot_webhook(update: dict):
    asyncio.create_task(handle_update(update))


async def handle_update(update: dict):
    telegram_update = types.Update(**update)
    try:
        for i in range(config.MAX_RETRIES):
            try:
                await dp.feed_update(bot=bot, update=telegram_update)
                break
            except ConnectionError as e:
                if i == config.MAX_RETRIES - 1:
                    raise e
                continue
            except TelegramNetworkError as e:
                if i == config.MAX_RETRIES - 1:
                    raise e
                continue
    except ConnectionError:
        await handle_connection_error(bot, telegram_update)
    except TelegramNetworkError:
        await handle_network_error(bot, telegram_update)
    except TelegramForbiddenError:
        await handle_forbidden_error(telegram_update)
    except Exception as e:
        logging.exception(f"Error in bot_webhook: {e}")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    uvicorn.run(app, host="0.0.0.0", port=os.getenv("PORT", 8080))
