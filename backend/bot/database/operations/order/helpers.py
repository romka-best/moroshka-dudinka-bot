from bot.database.main import firebase
from bot.database.models.order import Order, OrderStatus, OrderItem


async def create_order_object(user_id: str, items: list[OrderItem]) -> Order:
    order_ref = firebase.db.collection(Order.COLLECTION_NAME).document()
    return Order(
        id=order_ref.id,
        user_id=user_id,
        items=items,
        status=OrderStatus.PLACED,
    )
