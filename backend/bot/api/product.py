import math
from typing import Optional

from fastapi import APIRouter, Query

from bot.database.operations.product.getters import get_product_types, get_products, get_product_type

router = APIRouter(
    prefix="/products",
    tags=["product"],
)


@router.get("/products")
async def get_all_products(
    title: Optional[str] = None,
    page: int = Query(1, gt=0),
    size: int = Query(20, gt=0),
):
    all_products = await get_products()
    products_by_page = await get_products(title, page * size, size)

    result = []
    for product in products_by_page:
        product_type = await get_product_type(product.type_id)
        result.append({
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "cost": product.cost,
            "weight": product.weight,
            "photos": product.photos,
            "type": {
                "id": product_type.id,
                "name": product_type.name,
            },
            "composition": product.composition,
            "size": product.size,
            "count": product.count,
        })

    return {
        "items": result,
        "page": page,
        "pages": math.ceil(len(all_products) / size),
        "size": len(result),
        "total": len(all_products)
    }


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
