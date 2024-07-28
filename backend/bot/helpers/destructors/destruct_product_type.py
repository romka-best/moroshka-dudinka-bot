from google.cloud import firestore

from bot.database.models.product import Product
from bot.database.operations.product.updaters import (
    update_product_in_transaction,
    update_product_type_in_transaction,
)


@firestore.async_transactional
async def destruct_product_type(
    transaction,
    product_type_id: str,
    products: list[Product],
):
    for product in products:
        if product.type_id == product_type_id:
            await update_product_in_transaction(transaction, product.id, {
                "type_id": firestore.DELETE_FIELD,
            })

    await update_product_type_in_transaction(transaction, product_type_id, {"is_deleted": True})
