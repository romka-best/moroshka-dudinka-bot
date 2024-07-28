from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from bot.database.main import firebase
from bot.database.models.order import UpdateOrder
from bot.database.models.product import CreateProductType, Product
from bot.database.operations.order.getters import get_orders, get_order
from bot.database.operations.order.updaters import update_order
from bot.database.operations.product.getters import get_products
from bot.database.operations.product.writers import write_product_type, write_product
from bot.database.operations.user.getters import get_user
from bot.helpers.destructors.destruct_product_type import destruct_product_type

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)


@router.get("/orders", tags=["order"])
async def get_all_orders():
    orders = await get_orders()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "status": order.status,
        })

    return result


@router.get("/orders/{order_id}", tags=["order"])
async def get_order_by_id(order_id: str):
    order = await get_order(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    user = await get_user(order.user_id)
    items = [order_item.to_dict() for order_item in order.items]
    return {
        "id": order.id,
        "user": user.to_dict(),
        "items": items,
        "status": order.status,
    }


@router.patch("/orders/{order_id}", tags=["order"])
async def update_order_by_id(order_id: str, updated_order: UpdateOrder):
    order = await get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if updated_order.status is not None and updated_order.status != order.status:
        await update_order(order.id, {
            "status": updated_order.status
        })

        return JSONResponse(
            status_code=status.HTTP_204_NO_CONTENT,
            content={"message": "Order status was changed"}
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Nothing was changed"}
    )


@router.post("/products", tags=["product"])
async def create_product(created_product: Product):
    await write_product(
        title=created_product.title,
        description=created_product.description,
        cost=created_product.cost,
        weight=created_product.weight,
        photos=created_product.photos,
        type_id=created_product.type_id,
        composition=created_product.composition,
        size=created_product.size,
        count=created_product.count,
    )

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={"message": "Product type was created"}
    )


@router.post("/products/types", tags=["product"])
async def create_product_type(created_product_type: CreateProductType):
    await write_product_type(created_product_type.name)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={"message": "Product type was created"}
    )


@router.delete("/products/types/{product_type_id}", tags=["product"])
async def delete_product_type(product_type_id: str):
    products = await get_products()
    transaction = firebase.db.transaction()
    await destruct_product_type(transaction, product_type_id, products)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Product type was deleted"}
    )
