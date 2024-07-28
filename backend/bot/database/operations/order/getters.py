from typing import Optional

from google.cloud.firestore_v1 import FieldFilter

from bot.database.main import firebase
from bot.database.models.order import Order


async def get_order(order_id: str) -> Optional[Order]:
    order_ref = firebase.db.collection(Order.COLLECTION_NAME).document(str(order_id))
    order = await order_ref.get()

    if order.exists:
        return Order(**order.to_dict())


async def get_orders() -> list[Order]:
    orders = firebase.db.collection(Order.COLLECTION_NAME).stream()

    return [
        Order(**order.to_dict()) async for order in orders
    ]


async def get_orders_by_user_id(user_id: str) -> Optional[Order]:
    order_stream = firebase.db.collection(Order.COLLECTION_NAME) \
        .where(filter=FieldFilter("user_id", "==", user_id)) \
        .limit(1) \
        .stream()

    async for doc in order_stream:
        return Order(**doc.to_dict())
