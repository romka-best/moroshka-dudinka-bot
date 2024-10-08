from datetime import datetime, timezone
from typing import Dict

from bot.database.main import firebase
from bot.database.models.cart import Cart


async def update_cart(cart_id: str, data: Dict) -> None:
    cart_ref = firebase.db.collection(Cart.COLLECTION_NAME).document(cart_id)
    data['edited_at'] = datetime.now(timezone.utc)

    await cart_ref.update(data)


async def update_cart_in_transaction(transaction, cart_id: str, data: Dict):
    data['edited_at'] = datetime.now(timezone.utc)

    transaction.update(firebase.db.collection(Cart.COLLECTION_NAME).document(cart_id), data)
