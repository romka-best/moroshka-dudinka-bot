from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


async def create_product_object(
    title: str,
    description: str,
    cost: int,
    weight: int,
    photos: list[str],
    type_id: str,
    composition: str,
    size: dict,
    count: int,
) -> Product:
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document()
    return Product(
        id=product_ref.id,
        title=title,
        description=description,
        cost=cost,
        weight=weight,
        photos=photos,
        type_id=type_id,
        composition=composition,
        size=size,
        count=count,
    )


async def create_product_type_object(name: str) -> ProductType:
    product_type_ref = firebase.db.collection(ProductType.COLLECTION_NAME).document()
    return ProductType(
        id=product_type_ref.id,
        name=name,
    )
