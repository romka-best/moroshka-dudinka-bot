from typing import Optional

from google.cloud.firestore_v1 import FieldFilter, Query

from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


async def get_product(product_id: str) -> Optional[Product]:
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document(product_id)
    product = await product_ref.get()

    if product.exists:
        return Product(**product.to_dict())


async def get_products(title: str = None, type_id: str = None, offset: int = None, limit: int = None) -> list[Product]:
    products_query = firebase.db.collection(Product.COLLECTION_NAME) \
        .order_by('created_at', direction=Query.ASCENDING) \
        .where(filter=FieldFilter('is_deleted', '==', False))

    if title:
        products_query = products_query.order_by('system_title') \
            .where('system_title', '>=', title.lower()) \
            .where('system_title', '<=', title.lower() + '\uf8ff')
    if type_id:
        products_query.where('type_ids', 'array_contains', type_id)
    if offset:
        products_query = products_query.offset(offset)
    if limit:
        products_query = products_query.limit(limit)

    products = products_query.stream()

    return [
        Product(**product.to_dict()) async for product in products
    ]


async def get_product_type(product_type_id: str) -> Optional[ProductType]:
    product_type_stream = firebase.db.collection(ProductType.COLLECTION_NAME) \
        .where(filter=FieldFilter('id', '==', product_type_id)) \
        .where(filter=FieldFilter('is_deleted', '==', False)) \
        .limit(1) \
        .stream()

    async for doc in product_type_stream:
        return ProductType(**doc.to_dict())


async def get_product_types(name: str = None) -> list[ProductType]:
    product_types_query = firebase.db.collection(ProductType.COLLECTION_NAME) \
        .where(filter=FieldFilter('is_deleted', '==', False))

    if name:
        product_types_query = product_types_query.order_by('system_name') \
            .where('system_name', '>=', name.lower()) \
            .where('system_name', '<=', name.lower() + '\uf8ff')

    product_types = product_types_query.stream()

    return [
        ProductType(**product_type.to_dict()) async for product_type in product_types
    ]
