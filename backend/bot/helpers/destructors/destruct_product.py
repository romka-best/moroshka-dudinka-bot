from google.cloud import firestore

from bot.database.models.cart import Cart
from bot.database.operations.cart.updaters import update_cart_in_transaction
from bot.database.operations.product.updaters import update_product_in_transaction


@firestore.async_transactional
async def destruct_product(
    transaction,
    product_id: str,
    carts: list[Cart],
):
    for cart in carts:
        for cart_item in cart.items:
            if cart_item.product_id == product_id:
                await update_cart_in_transaction(transaction, cart.id, {
                    'items': list(filter(lambda item: item.product_id != product_id, cart.items)),
                })

    await update_product_in_transaction(transaction, product_id, {'is_deleted': True})
