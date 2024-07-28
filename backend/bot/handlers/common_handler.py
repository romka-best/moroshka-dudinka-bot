from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from bot.database.main import firebase
from bot.database.operations.user.getters import get_user
from bot.helpers.initializers.initialize_user import initialize_user
from bot.locales.texts import Texts

common_router = Router()


@common_router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    await state.clear()

    user_id = str(message.from_user.id)
    user = await get_user(user_id)
    if not user:
        transaction = firebase.db.transaction()
        await initialize_user(transaction, message.from_user)

    greeting = Texts.START
    await message.answer(
        text=greeting,
        message_effect_id="5046509860389126442",
    )
