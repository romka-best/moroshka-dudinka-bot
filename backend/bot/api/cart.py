import asyncio

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from bot.database.models.cart import CartItem
from bot.database.operations.cart.getters import get_cart
from bot.database.operations.cart.updaters import update_cart
from bot.database.operations.product.getters import get_product

cart_router = APIRouter(
    prefix="/carts",
    tags=["cart"],
)


@cart_router.get("/{cart_id}")
async def get_cart_by_id(cart_id: str):
    cart = await get_cart(cart_id)
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    products = await asyncio.gather(*[
        get_product(cart_item.product_id) for cart_item in cart.items
    ])

    items = [
        {
            "product": product.to_dict(),
            "count": cart_item.count
        } for product, cart_item in zip(products, cart.items)
    ]

    return {
        "id": cart.id,
        "items": items,
    }


@cart_router.put("/{cart_id}")
async def put_item_to_cart(cart_id: str, item: CartItem):
    cart = await get_cart(cart_id)
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    for cart_item in cart.items:
        if cart_item.product_id == item.product_id:
            if cart_item.count <= 0:
                cart.items = list(filter(lambda ci: ci.product_id != item.product_id, cart.items))
                await update_cart(cart_id, {
                    "items": cart.items,
                })

                return JSONResponse(
                    status_code=status.HTTP_204_NO_CONTENT,
                    content={"message": "Item was removed from the cart"}
                )
            else:
                cart_item.count = item.count
                await update_cart(cart_id, {
                    "items": cart.items,
                })

                return JSONResponse(
                    status_code=status.HTTP_204_NO_CONTENT,
                    content={"message": "Count of item was changed in the cart"}
                )
    else:
        new_cart_item = CartItem(product_id=item.product_id, count=item.count)
        cart.items.append(new_cart_item.to_dict())
        await update_cart(cart_id, {
            "items": cart.items,
        })

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"message": "Item was added to the cart"}
        )


@cart_router.delete("/{cart_id}")
async def clear_cart(cart_id: str):
    cart = await get_cart(cart_id)
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    cart.items = []
    await update_cart(cart_id, {
        "items": cart.items,
    })

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "All items were removed from the cart"}
    )
