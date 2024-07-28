from bot.database.main import firebase
from bot.database.models.order import Order
from bot.database.models.product import Product
from bot.database.operations.order.helpers import create_order_object


async def write_order(user_id: str, products: list[Product]) -> Order:
    order = await create_order_object(user_id, products)
    await firebase.db.collection(Order.COLLECTION_NAME).document(order.id).set(
        order.to_dict()
    )

    return order
