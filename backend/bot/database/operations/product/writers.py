from bot.database.main import firebase
from bot.database.models.product import Product, ProductType
from bot.database.operations.product.helpers import create_product_object, create_product_type_object


async def write_product(
    title: str,
    description: str,
    cost: int,
    weight: int,
    photos: list[str],
    type_ids: list[str],
    composition: str,
    size: dict,
    count: int,
) -> Product:
    product = await create_product_object(
        title,
        description,
        cost,
        weight,
        photos,
        type_ids,
        composition,
        size,
        count,
    )
    await firebase.db.collection(Product.COLLECTION_NAME).document(product.id).set(
        product.to_dict()
    )

    return product


async def write_product_type(name: str, icon: str) -> ProductType:
    product_type = await create_product_type_object(name, icon)
    await firebase.db.collection(ProductType.COLLECTION_NAME).document(product_type.id).set(
        product_type.to_dict()
    )

    return product_type
