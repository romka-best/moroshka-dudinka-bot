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
        if product_type_id in product.type_ids:
            await update_product_in_transaction(transaction, product.id, {
                'type_ids': list(filter(lambda type_id: product_type_id != type_id, product.type_ids)),
            })

    await update_product_type_in_transaction(transaction, product_type_id, {'is_deleted': True})
