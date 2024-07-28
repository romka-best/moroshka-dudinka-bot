from typing import Optional

from bot.database.main import firebase
from bot.database.models.product import Product


async def get_product(product_id: str) -> Optional[Product]:
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document(product_id)
    product = await product_ref.get()

    if product.exists:
        return Product(**product.to_dict())


async def get_products() -> list[Product]:
    products = firebase.db.collection(Product.COLLECTION_NAME).stream()

    return [
        Product(**product.to_dict()) async for product in products
    ]
