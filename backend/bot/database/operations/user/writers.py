from aiogram.types import User as TelegramUser

from bot.database.main import firebase
from bot.database.models.user import User
from bot.database.operations.user.helpers import create_user_object


async def write_user_in_transaction(
    transaction,
    telegram_user: TelegramUser,
) -> User:
    user_ref = firebase.db.collection(User.COLLECTION_NAME).document(str(telegram_user.id))
    user_data = (await user_ref.get()).to_dict() or {}

    created_user = create_user_object(
        telegram_user,
        user_data,
    )

    transaction.set(user_ref, created_user.to_dict())

    return created_user
