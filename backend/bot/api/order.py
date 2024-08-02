from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from bot.database.main import firebase
from bot.database.models.order import CreateOrder, OrderItem
from bot.database.operations.cart.getters import get_cart
from bot.database.operations.order.getters import get_order
from bot.database.operations.product.getters import get_product
from bot.helpers.initializers.initialize_order import initialize_order

order_router = APIRouter(
    prefix="/orders",
    tags=["order"],
)


@order_router.post("/")
async def create_order(created_order: CreateOrder):
    cart = await get_cart(created_order.cart_id)
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    items = []
    for cart_item in cart.items:
        product = await get_product(cart_item.product_id)
        items.append(OrderItem(product=product, count=cart_item.count))
    transaction = firebase.db.transaction()
    await initialize_order(transaction, cart.id, cart.user_id, items)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={"message": "Order was placed"}
    )


@order_router.get("/{order_id}")
async def get_order_by_id(order_id: str):
    order = await get_order(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    products = [product.to_dict() for product in order.products]
    return {
        "id": order.id,
        "user_id": order.user_id,
        "items": products,
        "status": order.status,
    }
