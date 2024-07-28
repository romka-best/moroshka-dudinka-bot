from datetime import datetime, timezone
from typing import Dict

from bot.database.main import firebase
from bot.database.models.order import Order


async def update_order(order_id: str, data: Dict) -> None:
    order_ref = firebase.db.collection(Order.COLLECTION_NAME).document(order_id)
    data['edited_at'] = datetime.now(timezone.utc)

    await order_ref.update(data)
