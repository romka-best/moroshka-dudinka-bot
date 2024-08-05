import math
from typing import Optional

from fastapi import APIRouter, Query

from bot.database.operations.product.getters import get_product_types, get_products, get_product_type

product_router = APIRouter(
    prefix="/products",
    tags=["product"],
)


@product_router.get("")
async def get_all_products(
    title: Optional[str] = None,
    page: int = Query(0, ge=0),
    size: int = Query(20, gt=0),
):
    all_products = await get_products()
    products_by_page = await get_products(title, page * size, size)

    result = []
    for product in products_by_page:
        product_types = []
        for product_type_id in product.type_ids:
            product_type = await get_product_type(product_type_id)
            product_types.append({
                "id": product_type.id,
                "name": product_type.name,
            })
        result.append({
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "cost": product.cost,
            "weight": product.weight,
            "photos": product.photos,
            "types": product_types,
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


@product_router.get("/types")
async def get_all_product_types():
    product_types = await get_product_types()

    result = []
    for product_type in product_types:
        result.append({
            "id": product_type.id,
            "name": product_type.name,
        })

    return result
