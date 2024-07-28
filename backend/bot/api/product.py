from fastapi import APIRouter

from bot.database.operations.product.getters import get_product_types

router = APIRouter(
    prefix="/products",
    tags=["product"],
)


@router.get("/products/types")
async def get_all_product_types():
    product_types = await get_product_types()

    result = []
    for product_type in product_types:
        result.append({
            "id": product_type.id,
            "name": product_type.name,
        })

    return result
