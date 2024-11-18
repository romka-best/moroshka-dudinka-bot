from aiogram.types import User as TelegramUser

from bot.database.models.user import User


def create_user_object(
    telegram_user: TelegramUser,
    user_data: dict,
) -> User:
    return User(
        id=str(telegram_user.id),
        first_name=telegram_user.first_name,
        last_name=telegram_user.last_name or '',
        username=telegram_user.username,
        photo_url=user_data.get('photo_url', ''),
        is_blocked=False,
        is_banned=False,
        is_admin=False,
    )
