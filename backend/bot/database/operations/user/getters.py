from typing import Optional

from bot.database.main import firebase
from bot.database.models.user import User


async def get_user(user_id: str) -> Optional[User]:
    user_ref = firebase.db.collection(User.COLLECTION_NAME).document(user_id)
    user = await user_ref.get()

    if user.exists:
        return User(**user.to_dict())
