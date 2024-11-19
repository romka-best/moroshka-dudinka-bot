from datetime import datetime, timezone
from typing import Dict

from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


async def update_product(product_id: str, data: Dict) -> None:
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document(product_id)
    data['edited_at'] = datetime.now(timezone.utc)

    await product_ref.update(data)


async def update_product_in_transaction(transaction, product_id: str, data: Dict) -> None:
    data['edited_at'] = datetime.now(timezone.utc)

    transaction.update(firebase.db.collection(Product.COLLECTION_NAME).document(product_id), data)


async def update_product_type(product_type_id: str, data: Dict) -> None:
    product_type_ref = firebase.db.collection(ProductType.COLLECTION_NAME).document(product_type_id)
    data['edited_at'] = datetime.now(timezone.utc)

    await product_type_ref.update(data)


async def update_product_type_in_transaction(transaction, product_type_id: str, data: Dict) -> None:
    data['edited_at'] = datetime.now(timezone.utc)

    transaction.update(firebase.db.collection(ProductType.COLLECTION_NAME).document(product_type_id), data)
