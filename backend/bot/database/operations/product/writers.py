from bot.database.main import firebase
from bot.database.models.product import Product, ProductType
from bot.database.operations.product.helpers import create_product_object


async def write_product(
    title: str,
    description: str,
    cost: int,
    weight: int,
    photos: list[str],
    type: ProductType,
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
        type,
        composition,
        size,
        count,
    )
    await firebase.db.collection(Product.COLLECTION_NAME).document(product.id).set(
        product.to_dict()
    )

    return product
