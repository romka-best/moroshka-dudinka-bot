from bot.database.main import firebase
from bot.database.models.order import Order, OrderStatus
from bot.database.models.product import Product


async def create_order_object(user_id: str, products: list[Product]) -> Order:
    order_ref = firebase.db.collection(Order.COLLECTION_NAME).document()
    return Order(
        id=order_ref.id,
        user_id=user_id,
        products=products,
        status=OrderStatus.PLACED,
    )
