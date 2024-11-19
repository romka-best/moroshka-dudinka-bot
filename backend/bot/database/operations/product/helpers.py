from bot.database.main import firebase
from bot.database.models.product import Product, ProductType


async def create_product_object(
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
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document()
    return Product(
        id=product_ref.id,
        title=title,
        system_title=title.lower(),
        description=description,
        cost=cost,
        weight=weight,
        photos=photos,
        type_ids=type_ids,
        composition=composition,
        size=size,
        count=count,
        is_deleted=False,
    )


async def create_product_type_object(name: str, icon: str) -> ProductType:
    product_type_ref = firebase.db.collection(ProductType.COLLECTION_NAME).document()
    return ProductType(
        id=product_type_ref.id,
        name=name,
        system_name=name.lower(),
        icon=icon,
        is_deleted=False,
    )
