from typing import Optional

from google.cloud.firestore_v1 import FieldFilter

from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


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


async def get_product_types() -> list[ProductType]:
    product_types = (
        firebase.db.collection(ProductType.COLLECTION_NAME)
        .where(filter=FieldFilter("is_deleted", "==", False))
        .stream()
    )

    return [
        ProductType(**product_type.to_dict()) async for product_type in product_types
    ]
