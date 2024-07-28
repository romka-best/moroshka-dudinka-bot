from google.cloud import firestore

from bot.database.models.order import OrderItem
from bot.database.operations.cart.updaters import update_cart_in_transaction
from bot.database.operations.order.writers import write_order_in_transaction


@firestore.async_transactional
async def initialize_order(
    transaction,
    cart_id: str,
    user_id: str,
    items: list[OrderItem]
):
    await write_order_in_transaction(transaction, user_id, items)
    await update_cart_in_transaction(transaction, cart_id, {"items": []})
