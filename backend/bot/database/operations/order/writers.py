from bot.database.main import firebase
from bot.database.models.order import Order, OrderItem
from bot.database.operations.order.helpers import create_order_object


async def write_order_in_transaction(transaction, user_id: str, items: list[OrderItem]) -> Order:
    order = await create_order_object(user_id, items)
    order.items = list(map(lambda old_order_item: {
        **old_order_item.to_dict(),
        'product': old_order_item.product.to_dict(),
    }, order.items))
    transaction.set(firebase.db.collection(Order.COLLECTION_NAME).document(order.id), order.to_dict())

    return order
