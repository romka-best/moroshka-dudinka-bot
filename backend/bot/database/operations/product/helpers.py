from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


async def create_product_object(
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
    order_ref = firebase.db.collection(Product.COLLECTION_NAME).document()
    return Product(
        id=order_ref.id,
        title=title,
        description=description,
        cost=cost,
        weight=weight,
        photos=photos,
        type=type,
        composition=composition,
        size=size,
        count=count,
    )
