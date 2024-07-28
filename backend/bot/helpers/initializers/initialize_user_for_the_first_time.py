from aiogram.types import User
from google.cloud import firestore

from bot.database.operations.cart.writers import write_cart_in_transaction
from bot.database.operations.user.writers import write_user_in_transaction


@firestore.async_transactional
async def initialize_user_for_the_first_time(
    transaction,
    telegram_user: User,
):
    await write_cart_in_transaction(transaction, str(telegram_user.id), [])
    await write_user_in_transaction(transaction, telegram_user)
